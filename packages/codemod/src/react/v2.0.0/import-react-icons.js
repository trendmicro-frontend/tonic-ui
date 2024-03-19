const mapKebabCaseToCapitalizedCamelCase = (str) => {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Function to create import declarations
  const createImportDeclaration = (packageName, importNames) => j.importDeclaration(
    importNames.map(importName => j.importSpecifier(j.identifier(importName))),
    j.literal(packageName),
  );

  // Find all import declarations from '@tonic-ui/react'
  const reactImports = root.find(j.ImportDeclaration, {
    source: { value: '@tonic-ui/react' },
  });

  // Transform import statements
  reactImports.forEach((path) => {
    const importSpecifiers = path.node.specifiers;
    const newSpecifiers = importSpecifiers.filter((specifier) => {
      return specifier.imported.name !== 'Icon';
    });
    if (newSpecifiers.length < importSpecifiers.length) {
      path.node.specifiers = newSpecifiers;
    }
  });

  const importedIcons = [];

  // Transform JSX elements
  root.findJSXElements('Icon').forEach((path) => {
    const iconProp = path.node.openingElement.attributes.find(
      (attribute) => attribute.name.name === 'icon'
    );

    if (iconProp && iconProp.value.type === 'Literal') {
      // Remove the 'icon' attribute
      path.node.openingElement.attributes = path.node.openingElement.attributes.filter(attribute => attribute.name?.name !== 'icon');

      const iconName = iconProp.value.value;
      const iconComponentName = `${mapKebabCaseToCapitalizedCamelCase(iconName)}Icon`;

      // Replace JSX element name
      path.node.openingElement.name.name = iconComponentName;

      if (!importedIcons.includes(iconComponentName)) {
        importedIcons.push(iconComponentName);
      }
    }
  });

  if (importedIcons.length > 0) {
    const reactIconsImports = root.find(j.ImportDeclaration, {
      source: { value: '@tonic-ui/react-icons' },
    });

    if (reactIconsImports.length === 0) {
      // If no import found, create a new import declaration and insert it
      const importDeclaration = createImportDeclaration('@tonic-ui/react-icons', importedIcons.sort());
      if (reactImports.length > 0) {
        reactImports.at(-1).get().insertAfter(importDeclaration);
      }
    } else {
      // If import exists, check if all the required icons are already imported
      const existingSpecifiers = reactIconsImports.get(0).node.specifiers;
      const missingIcons = importedIcons.filter(icon => !existingSpecifiers.some(specifier => specifier.imported.name === icon));

      if (missingIcons.length > 0) {
        // If there are missing icons, add them to the existing import
        const importDeclaration = reactIconsImports.get(0);
        missingIcons.forEach(icon => {
          const newSpecifier = j.importSpecifier(j.identifier(icon));
          importDeclaration.node.specifiers.push(newSpecifier);
        });
      }
    }
  }

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
}

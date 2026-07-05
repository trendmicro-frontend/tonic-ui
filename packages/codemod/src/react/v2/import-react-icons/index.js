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

  // Find all import declarations of `@tonic-ui/react`
  const reactImports = root.find(j.ImportDeclaration, {
    source: { value: '@tonic-ui/react' },
  });
  // Find all import declarations of `@tonic-ui/react-icons`
  const reactIconsImports = root.find(j.ImportDeclaration, {
    source: { value: '@tonic-ui/react-icons' },
  });

  const importedIconComponents = [];

  // Transform `<Icon icon="alert" />` to `<Icon as={AlertIcon} />`
  root.findJSXElements('Icon').forEach((path) => {
    path.node.openingElement.attributes = path.node.openingElement.attributes.reduce((acc, attribute) => {
      if (attribute.name?.name === 'icon') {
        const iconComponent = mapKebabCaseToCapitalizedCamelCase(attribute.value.value) + 'Icon';
        const asAttribute = j.jsxAttribute(
          j.jsxIdentifier('as'),
          j.jsxExpressionContainer(j.identifier(iconComponent)),
        );
        if (!importedIconComponents.includes(iconComponent)) {
          importedIconComponents.push(iconComponent);
        }
        return [...acc, asAttribute];
      }
      return [...acc, attribute];
    }, []);
  });

  // Add import declarations
  // ```js
  // import { AlertIcon } from '@tonic-ui/react-icons';
  // ```
  if (importedIconComponents.length > 0) {
    if (reactIconsImports.length === 0) {
      // If no import found, create a new import declaration and insert it
      const importDeclaration = createImportDeclaration('@tonic-ui/react-icons', importedIconComponents.sort());

      const lastReactImport = reactImports.length > 0 ? reactImports.at(-1) : null;
      if (lastReactImport) {
        lastReactImport.get().insertAfter(importDeclaration);
      }
    } else {
      // If import exists, check if all the required icons are already imported
      const existingSpecifiers = reactIconsImports.get(0).node.specifiers;
      const missingIcons = importedIconComponents.filter(icon => !existingSpecifiers.some(specifier => specifier.imported.name === icon));

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

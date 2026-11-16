# Tonic UI Token Export

This development plugin exports raw variables from the Tonic One v4 Foundations and Semantic libraries. The captures are design evidence, not verified Tonic UI v3 implementation facts.

## Usage

1. In Figma, select **Plugins → Development → Import plugin from manifest**.
2. Select `scripts/figma-variables/figma-plugin/manifest.json` in this repository. If the plugin was previously imported from another location, reimport the current manifest.
3. Open the authorized Foundations library or Semantic library using an operator-provided location and the required access.
4. Run **Tonic UI Token Export**. When the export finishes, click **Download JSON**.
5. Repeat for the other library.

A download is a private raw capture and can contain a file key. Keep it in operator-controlled temporary storage; never publish it or the converter's ignored `.payloads/` cache. The download does not update the repository. See the [capture and conversion procedure](../../../skills/tonic-ui-tokens-maintenance/references/figma-variable-capture.md) for the independently authorized conversion and review steps.

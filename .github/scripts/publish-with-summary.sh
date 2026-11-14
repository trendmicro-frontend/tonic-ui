#!/usr/bin/env bash
set -euo pipefail

# Keep Lerna's no-op messages uncolored for the report steps. Capture stderr too,
# and preserve failures from publishing or writing the log through pipefail.
FORCE_COLOR=0 yarn ci-publish --summary-file=publish-summary.json 2>&1 | tee "${RUNNER_TEMP}/publish.log"

import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

/**
 * Custom client entry.
 *
 * Identical to the framework default except for onRecoverableError, which
 * names the component that failed to hydrate instead of leaving a minified
 * React error number in the console. Hydration mismatches are silent
 * correctness bugs - the root quietly falls back to client rendering and the
 * prerendered HTML is thrown away - so they are worth being loud about.
 */
startTransition(() => {
  hydrateRoot(document, <HydratedRouter />, {
    onRecoverableError(error, errorInfo) {
      // eslint-disable-next-line no-console
      console.warn(
        "[hydration]",
        error?.message || error,
        errorInfo?.componentStack || ""
      );
    },
  });
});

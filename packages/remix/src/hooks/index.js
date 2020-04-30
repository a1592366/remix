
import { useComponent } from './useComponent';

export {
  useComponent
}
export function useRemixController (Component, config = {}) {
  const ViewController = useComponent(Component);

  ViewController.config = config;
  ViewController.isViewController = true;

  return ViewController;
}


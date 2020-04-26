import env from '../../../env';
import runApplicationClient  from './client';
import { ViewControllersManager } from './ViewController';

export default function (context, instance) {
  new ViewControllersManager(context, instance);
  runApplicationClient(context, instance);
} 
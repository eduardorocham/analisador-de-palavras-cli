import * as path from 'path';
import { CLIApplication } from './src/cli/CLIApplication';

const hierarchyPath = path.join(__dirname, 'dicts/nature.json');
const app = new CLIApplication(hierarchyPath);
app.run();

import * as fs from 'graceful-fs';

export class Main {
  public run(): void {
    console.log('test');
    fs.readFile('./resources/skeptoid.xml', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const content = data;

      console.log(content);
    });
  }
}

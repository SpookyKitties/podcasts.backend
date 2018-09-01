// import { PodcastModel } from './PodcastModel';
import Axios from 'axios';
import * as fs from 'graceful-fs';
import * as xml2js from 'xml2js';
import { Result } from './itunes';
import { PodcastEpisodeModel } from './PodcastEpisodeModel';
import { PodcastModel } from './PodcastModel';

export class Main {
  public async run() {
    console.log('test');
    // this.downloadItunesInformation();
    fs.readdir('./xmlTest', (err, files) => {
      files.forEach(file => {
        fs.readFile('./xmlTest/' + file, 'utf8', (err2: any, data: any) => {
          // console.log(data);
          const podcast = this.parsePodcast(data);
          if (podcast) {
            this.writePodcastXml(podcast, file);
          }
        });
      });
    });
    // const skeptoid = 'http://skeptoid.com/podcast.xml';
    // this.downloadPodcast(skeptoid);
  }

  private downloadItunesInformation() {
    ['o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].forEach(
      async letter => {
        await fs.readFile(
          './resources/' + letter + '.json',
          'utf8',
          (err, data) => {
            if (err) {
              console.log('error 1');
              throw err;
            }
            const asdf: Result[] = JSON.parse(data).results;
            // console.log(asdf);
            for (const p of asdf) {
              // console.log(p.feedUrl);
              this.downloadPodcast(p.feedUrl, p.collectionId);
              console.log(p.feedUrl + ' finished');
            }
          }
        );
      }
    );
  }

  private async downloadPodcast(url: string, name: number) {
    await Axios.get(url)
      .then(response => {
        // console.log(response);

        // console.log(response.data);

        fs.writeFile('./xmlTest/' + name + '.xml', response.data, err => {
          console.log('error');
        });
        // const podcast = this.parsePodcast(response.data);
        // if (podcast !== null) {
        //   console.log(podcast);
        //   this.writePodcastXml(podcast, name);
        // }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  private writePodcastXml(podcast: PodcastModel, name: string): void {
    fs.writeFile(
      './xmlTest/' + name + '.json',
      JSON.stringify(podcast),
      err => {}
    );
  }

  private parsePodcast(data: string): PodcastModel | null {
    xml2js.parseString(data, { strict: false }, (xml2jsErr, result) => {
      if (xml2jsErr) {
        throw xml2jsErr;
      }
      try {
        const channel = result.RSS.CHANNEL[0];
        // const title = channel.TITLE[0];
        // const imageUrl = channel.IMAGE[0].URL[0];
        // const description = channel.DESCRIPTION[0];
        return new PodcastModel(channel);
      } catch {
        return null;
      }
    });

    return null;
  }
}

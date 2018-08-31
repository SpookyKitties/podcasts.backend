import * as fs from 'graceful-fs';
import * as xml2js from 'xml2js';
import { PodcastEpisodeModel } from './PodcastEpisodeModel';
import { PodcastModel } from './PodcastModel';
// import { PodcastModel } from './PodcastModel';
import Axios from 'axios';

export class Main {
  public run(): void {
    console.log('test');
    fs.readFile('./resources/skeptoid.xml', 'utf8', (err, data) => {
      if (err) {
        console.log('error 1');
        throw err;
      }
      //   const podcast = new PodcastModel();

      //   const content = data;
      const pEpisodes: PodcastEpisodeModel[] = [];

      // this.parsePodcast(data);
      // console.log(pEpisodes.length);
    });
    Axios.get('http://skeptoid.com/podcast.xml').then(response => {
      // console.log(response);
      this.parsePodcast(response.data);
    });
  }

  private parsePodcast(data: string) {
    xml2js.parseString(data, { strict: false }, (xml2jsErr, result) => {
      if (xml2jsErr) {
        throw xml2jsErr;
      }
      const channel = result.RSS.CHANNEL[0];
      // const title = channel.TITLE[0];
      // const imageUrl = channel.IMAGE[0].URL[0];
      // const description = channel.DESCRIPTION[0];
      const podcast = new PodcastModel(channel);
      // console.log(podcast);
      fs.writeFile(
        './resources/skeptoid.json',
        JSON.stringify(podcast),
        err => {}
      );
    });
  }
}

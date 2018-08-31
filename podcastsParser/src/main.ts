import * as fs from 'graceful-fs';
import * as xml2js from 'xml2js';
import { PodcastEpisodeModel } from './PodcastEpisodeModel';
// import { PodcastModel } from './PodcastModel';

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

      xml2js.parseString(data, { strict: false }, (xml2jsErr, result) => {
        if (xml2jsErr) {
          throw xml2jsErr;
        }
        const channel = result.RSS.CHANNEL[0];
        const title = channel.TITLE[0];
        const imageUrl = channel.IMAGE[0].URL[0];
        const description = channel.DESCRIPTION[0];
        for (const item of channel.ITEM) {
          const author = item['ITUNES:AUTHOR'];
          const episodeTitle = item['ITUNES:TITLE'];
          const subtitle = item['ITUNES:SUBTITLE'];
          const summary = item['ITUNES:SUMMARY'];
          const episode = item['ITUNES:EPISODE'];
          const episodeType = item['ITUNES:EPISODETYPE'];
          const episodeDescription = item.DESCRIPTION;
          const enclosure = item.ENCLOSURE;
          const guid = item.GUID;
          const pubDate = item.PUBDATE;

          const ppEpisode = new PodcastEpisodeModel(item);
          //   episodeTitle,
          //   enclosure[0].$.URL,
          //   author,
          //   // episodeTitle,
          //   subtitle,
          //   summary,
          //   episode,
          //   episodeType,
          //   episodeDescription,
          //   enclosure,
          //   guid,
          //   pubDate
          // );

          console.log(ppEpisode);
        }
      });
    });
  }
}

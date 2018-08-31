import { PodcastEpisodeModel, Keyword } from './PodcastEpisodeModel';
export class PodcastModel {
  public title: string;
  public url: string;
  // public lastUpdated: Date;
  public description: string;
  public imageUrl: string;
  public image: Image;
  public subtitle: string;
  public author: string;
  public summary: string;
  public explicit: string;
  public type: string;
  public category: string;
  public keywords: Keyword[] = [];
  public podcastEpisodes: PodcastEpisodeModel[] = [];
  // constructor(
  //   podcastEpisodes: PodcastEpisodeModel[],
  //   title: string,
  //   url: string,
  //   lastUpdated: Date,
  //   description: string,
  //   imageUrl: string
  // ) {
  //   this.podcastEpisodes = podcastEpisodes;
  //   this.title = title;
  //   this.url = url;
  //   this.lastUpdated = lastUpdated;
  //   this.description = description;
  //   this.imageUrl = imageUrl;
  //   console.log(imageUrl);
  // }

  constructor(channel: any) {
    this.imageUrl = channel.IMAGE[0].URL[0];
    this.image = new Image(
      channel.IMAGE[0].URL,
      channel.IMAGE[0].TITLE,
      channel.IMAGE[0].LINK
    );
    this.title = channel.TITLE[0];
    this.description = channel.DESCRIPTION[0];
    this.url = channel.DESCRIPTION[0];
    // this.lastUpdated = new Date(channel.PUBDATE[0]);

    this.subtitle = channel['ITUNES:SUBTITLE'][0];
    this.author = channel['ITUNES:AUTHOR'][0];

    this.summary = channel['ITUNES:SUMMARY'][0];
    this.explicit = channel['ITUNES:EXPLICIT'];
    this.type = channel['ITUNES:TYPE'][0];
    (channel['ITUNES:KEYWORDS'][0] as string).split(',').forEach(keyword => {
      this.keywords.push(new Keyword(keyword));
    });
    this.category = channel['ITUNES:CATEGORY'][0];

    for (const item of channel.ITEM) {
      this.podcastEpisodes.push(new PodcastEpisodeModel(item));
    }
  }
}

export class Image {
  public url: string;
  public title: string;
  public link: string;

  constructor(url: string, title: string, link: string) {
    this.url = url;
    this.title = title;
    this.link = link;
  }
}

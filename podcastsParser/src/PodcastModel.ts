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
    this.url = this.setFeedUrl(channel);

    // console.log(channel['ATOM:LINK'][0].$.HREF);

    // this.lastUpdated = new Date(channel.PUBDATE[0]);

    this.subtitle = channel['ITUNES:SUBTITLE'][0];
    this.author = channel['ITUNES:AUTHOR'][0];

    this.summary = channel['ITUNES:SUMMARY'][0];
    this.explicit = channel['ITUNES:EXPLICIT'];

    this.type = this.setType(channel, ['ITUNES:TYPE']); //channel['ITUNES:TYPE'][0];
    (channel['ITUNES:KEYWORDS'][0] as string).split(',').forEach(keyword => {
      this.keywords.push(new Keyword(keyword));
    });
    this.category = channel['ITUNES:CATEGORY'][0];

    this.failingTest();
    for (const item of channel.ITEM) {
      this.podcastEpisodes.push(new PodcastEpisodeModel(item));
    }
  }

  private failingTest() {
    if (this.title.indexOf('San Francisco Chronicle Food') !== -1) {
      console.log(this.title);
    }
  }

  private setFeedUrl(channel: any): string {
    if (channel['ATOM:LINK'] !== undefined) {
      return channel['ATOM:LINK'][0].$.HREF;
    }
    return '';
  }

  private setType(channel: any, tags: string[]): string {
    return this.setBasicTag(channel, tags);
  }
  private setBasicTag(channel: any, tags: string[]): string {
    tags.forEach(tag => {
      if (channel[tag] !== undefined) {
        return channel[tag][0];
      }
    });
    return '';
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

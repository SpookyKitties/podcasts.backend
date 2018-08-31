export class PodcastEpisodeModel {
  public title: string;
  // public url: string;
  public played = false;
  public author: string;
  // public episodeTitle: string;
  public subtitle: string;
  public summary: string;
  public episode: string;
  public episodeType: string;
  public episodeDescription: string;
  public enclosure: Enclosure;
  public guid: string;
  public pubDate: Date;
  // constructor(
  //   title: string,
  //   url: string,
  //   author: string,
  //   // episodeTitle: string,
  //   subtitle: string,
  //   summary: string,
  //   episode: string,
  //   episodeType: string,
  //   episodeDescription: string,
  //   enclosure: string,
  //   guid: string,
  //   pubDate: string
  // ) {
  //   this.title = title;
  //   this.url = url;
  //   this.author = author;
  //   // this.episodeTitle = episodeTitle;
  //   this.subtitle = subtitle;
  //   this.summary = summary;
  //   this.episode = episode;
  //   this.episodeType = episodeType;
  //   this.episodeDescription = episodeDescription;
  //   this.enclosure = enclosure;
  //   this.guid = guid;
  //   this.pubDate = new Date(pubDate);
  // }
  constructor(item: any) {
    this.author = item['ITUNES:AUTHOR'];
    this.title = item['ITUNES:TITLE'];
    this.subtitle = item['ITUNES:SUBTITLE'];
    this.summary = item['ITUNES:SUMMARY'];
    this.episode = item['ITUNES:EPISODE'];
    this.episodeType = item['ITUNES:EPISODETYPE'];
    this.episodeDescription = item.DESCRIPTION;
    this.enclosure = new Enclosure(
      item.ENCLOSURE[0].$.TYPE,
      item.ENCLOSURE[0].$.URL
    );
    this.guid = item.GUID;
    this.pubDate = item.PUBDATE;
  }
}

export class Enclosure {
  public type: string;
  public url: string;

  constructor(type: string, url: string) {
    this.type = type;
    this.url = url;
  }
}

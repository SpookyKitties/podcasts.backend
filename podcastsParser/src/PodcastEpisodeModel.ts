export class PodcastEpisodeModel {
  public author: string;
  public title: string;
  public subtitle: string;
  public summary: string;
  public episode: string;
  public episodeType: string;
  public description: string;
  public enclosure: Enclosure;
  public guid: string;
  public pubDate: Date;
  public keywords: Keyword[] = [];
  public played = false;

  constructor(item: any) {
    this.author = item['ITUNES:AUTHOR'][0];
    this.title = item['ITUNES:TITLE'][0];
    this.subtitle = item['ITUNES:SUBTITLE'][0];
    this.summary = item['ITUNES:SUMMARY'][0];

    if (item['ITUNES:EPISODE']) {
      this.episode = item['ITUNES:EPISODE'][0];
    } else {
      this.episode = '';
    }
    // console.log(this.episode);

    this.episodeType = item['ITUNES:EPISODETYPE'][0];
    this.description = item.DESCRIPTION[0];
    this.enclosure = new Enclosure(
      item.ENCLOSURE[0].$.TYPE[0],
      item.ENCLOSURE[0].$.URL[0]
    );
    this.guid = item.GUID[0];
    this.pubDate = new Date(item.PUBDATE);

    (item['ITUNES:KEYWORDS'][0] as string).split(',').forEach(keyword => {
      this.keywords.push(new Keyword(keyword));
    });
    // const tempKeywords = item['ITUNES:KEYWORDS'][0] as string;

    // if (tempKeywords !== undefined) {
    //   console.log(tempKeywords);
    // }
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

export class Keyword {
  public keyword: string;
  constructor(keyword: string) {
    this.keyword = keyword;
  }
}

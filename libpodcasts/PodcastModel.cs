using System;

namespace libpodcasts
{
    public class PodcastModel
    {
        public PodcastEpisodeModel[] podcastEpisodes { get; set; }
        public string title { get; set; }
        public string url { get; set; }
        public DateTime lastUpdated { get; set; }
        public string description { get; set; }
        public string imageUrl { get; set; }
    }
}

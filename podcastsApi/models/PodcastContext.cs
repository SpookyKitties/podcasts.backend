using JetBrains.Annotations;
using libpodcasts;
using Microsoft.EntityFrameworkCore;

namespace podcastsApi.Models
{
    public class PodcastContext : DbContext
    {
        public PodcastContext(DbContextOptions<PodcastContext> options) : base(options)
        {
        }

        public DbSet<PodcastModel> PodcastItems { get; set; }
    }
}

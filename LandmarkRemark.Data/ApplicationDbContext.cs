using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace LandmarkRemark.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        { }

        public DbSet<LandmarkRemark> LandmarkRemarks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }
    }

    public class LandmarkRemark
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Username { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
        public string Text { get; set; }
    }
}


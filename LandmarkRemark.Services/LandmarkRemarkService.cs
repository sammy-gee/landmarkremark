using LandmarkRemark.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LandmarkRemark.Services
{
    public class LandmarkRemarkService : ILandmarkRemarkService
    {
        public readonly ApplicationDbContext _dbContext;

        public LandmarkRemarkService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IList<Data.LandmarkRemark> GetAllLandmarkRemarks()
        {
            return _dbContext.LandmarkRemarks.ToList();
        }

        public Data.LandmarkRemark Add(Data.LandmarkRemark landmarkRemark)
        {
            landmarkRemark.Key = Guid.NewGuid().ToString();

            _dbContext.LandmarkRemarks.Add(landmarkRemark);

            landmarkRemark.Id = _dbContext.SaveChanges();

            return landmarkRemark;
        }
    }
}

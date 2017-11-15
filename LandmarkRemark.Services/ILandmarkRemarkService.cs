using System.Collections;
using System.Collections.Generic;
using LandmarkRemark.Data;

namespace LandmarkRemark.Services
{
    public interface ILandmarkRemarkService
    {
        IList<LandmarkRemark.Data.LandmarkRemark> GetAllLandmarkRemarks();

        Data.LandmarkRemark Add(Data.LandmarkRemark landmarkRemark);
    }
}
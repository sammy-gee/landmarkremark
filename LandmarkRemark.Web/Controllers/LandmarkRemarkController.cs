using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LandmarkRemark.Services;
using LandmarkRemark.Web.Models;

namespace LandmarkRemark.Web.Controllers
{
    [Route("api/[controller]")]
    public class LandmarkRemarksController : Controller
    {
        public readonly ILandmarkRemarkService _landmarkRemarkService;

        public LandmarkRemarksController(ILandmarkRemarkService landmarkRemarkService)
        {
            _landmarkRemarkService = landmarkRemarkService;
        }

        [HttpGet("[action]")]
        public IEnumerable<LandmarkRemarkModel> All()
        {
            var data = _landmarkRemarkService.GetAllLandmarkRemarks();

            return data.Select(a => new LandmarkRemarkModel()
            {
                Id = a.Id,
                Key = a.Key,
                Username = a.Username,
                LatLng = new decimal[] { a.Lat, a.Lng },
                Text = a.Text
            }).ToList();
        }


        [HttpPost("[action]")]
        public IActionResult Add([FromBody] LandmarkRemarkModel landmarkRemark)
        {
            //Add validation here 
            //Input validation
            //Check that this location hasnt been added already by same user already

            _landmarkRemarkService.Add(new Data.LandmarkRemark()
            {
                Username = landmarkRemark.Username,
                Lat = landmarkRemark.LatLng[0],
                Lng = landmarkRemark.LatLng[1],
                Text = landmarkRemark.Text
            });
            return Ok();
        }

    }
}

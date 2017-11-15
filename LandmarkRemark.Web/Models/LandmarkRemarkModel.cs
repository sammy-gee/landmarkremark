using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LandmarkRemark.Web.Models
{
    public class LandmarkRemarkModel
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Username { get; set; }
        public decimal[] LatLng { get; set; }
        public string Text { get; set; }
    }
}

using ConsomeAPI.Models;
using ConsomeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text;
//using System.Web.Mvc;

namespace ConsomeAPI.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly QueriesService _queriesService;

        public HomeController(ILogger<HomeController> logger,QueriesService queriesService)
        {
            _logger = logger;
            _queriesService = queriesService;
        }

        public string ConverteZip()
        {
            List<string> list = new List<string>();
            list.Add("572194424061");
            list.Add("572193482686");
            

            byte[] r1 = Zip(list);

            var r2 = Convert.ToBase64String(r1);

            //var r3 = Convert.FromBase64String(r2);

            //string r4 = Unzip(r3);

            var r5 = Parse(r2);

            string c = "";

            //foreach(var a in r4)
            //{
            //    c = a + "\r\n";
            //}

            //return r1 + "\r\n"  + r2 + "\r\n" + r3 + "\r\n" + r4 + "\r\n" + c;
            return r1 + "\r\n"  + r2 + "\r\n" + r5;
        }

        public static void CopyTo(Stream src, Stream dest)
        {
            byte[] bytes = new byte[4096];

            int cnt;

            while ((cnt = src.Read(bytes, 0, bytes.Length)) != 0)
            {
                dest.Write(bytes, 0, cnt);
            }
        }

        public static byte[] Zip(List<string> str)
        {
            //listMsisdn.SelectMany(a => Encoding.UTF8.GetBytes(a)).ToArray();
            var bytes = str.SelectMany(a => Encoding.UTF8.GetBytes(a)).ToArray();

            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream())
            {
                using (var gs = new GZipStream(mso, CompressionMode.Compress))
                {
                    //msi.CopyTo(gs);
                    CopyTo(msi, gs);
                }

                return mso.ToArray();
            }
        }

        public static string Unzip(byte[] bytes)
        {
            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream())
            {
                using (var gs = new GZipStream(msi, CompressionMode.Decompress))
                {
                    //gs.CopyTo(mso);
                    CopyTo(gs, mso);
                }

                return Encoding.UTF8.GetString(mso.ToArray());
            }
        }

        public static byte[] Unzip2(byte[] bytes)
        {
            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream())
            {
                using (var gs = new GZipStream(msi, CompressionMode.Decompress))
                {
                    //gs.CopyTo(mso);
                    CopyTo(gs, mso);
                }

                return mso.ToArray();
            }
        }

        public static List<string> Parse(string msisdnfileBase64)
        {
            List<string> response = new List<string>();

            byte[] bytes = Convert.FromBase64String(msisdnfileBase64);

            var a = Unzip2(bytes);

            using (MemoryStream file = new MemoryStream(a))
            using (BufferedStream bs = new BufferedStream(file))
            using (StreamReader reader = new StreamReader(file))
            {
                string line = string.Empty;
                while (reader.Peek() >= 0)
                {
                    line = reader.ReadLine().Trim();

                    response.Add(line);
                }
            }

            return response.Distinct().ToList();
        }

        //static void Main(string[] args)
        //{
        //    byte[] r1 = Zip("StringStringStringStringStringStringStringStringStringStringStringStringStringString");
        //    string r2 = Unzip(r1);
        //}

        #region "Other Tests"

        public IActionResult Index()
        {
            //return View(_queriesService.GetHero(""));
            return View();
        }

        public JsonResult Customer()
        {
            HttpClient client = new HttpClient();
            List<Customer> customerList = new List<Customer>();

            var response = client.GetAsync("http://localhost:5150/api/Customer/GetCustomer").Result;

            response.EnsureSuccessStatusCode();

            string conteudo = response.Content.ReadAsStringAsync().Result;

            dynamic resultado = JsonConvert.DeserializeObject(conteudo);

            if (resultado.Count > 0)
            {
                foreach (var a in resultado)
                {
                    customerList.Add(new Customer()
                    {
                        Id = a.id,
                        Name = a.name,
                        Enable = a.enable
                    });
                }
            }

            return Json(new { data = customerList }); //, JsonRequestBehavior.AllowGet
        }

        public JsonResult Teste()
        {
            List<Customer> customerList = new List<Customer>();

            customerList.Add(new Customer() { Id = 1, Name = "rodrigonew", Enable = true });
            customerList.Add(new Customer() { Id = 2, Name = "joao", Enable = false });
            customerList.Add(new Customer() { Id = 3, Name = "liah", Enable = true });

            return Json(new { data = customerList }); //, JsonRequestBehavior.AllowGet
        }

        public IActionResult Privacy()
        {
            return View();
        }

        //[Route("{nome:string}")]
        public IActionResult Character(string? nome)
        {
            return View(_queriesService.GetHero(nome));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        #endregion
    }
}
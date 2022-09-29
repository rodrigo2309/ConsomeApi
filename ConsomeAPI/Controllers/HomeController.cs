using ConsomeAPI.Models;
using ConsomeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
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
        private readonly ConverteZipService _converteZipService;

        public HomeController(ILogger<HomeController> logger,QueriesService queriesService, ConverteZipService converteZipService)
        {
            _logger = logger;
            _queriesService = queriesService;
            _converteZipService = converteZipService;
        }

        public List<string> ConverteZip()
        {
            List<string> list = new List<string>() { "572194424061" + Environment.NewLine , "572193482686" + Environment.NewLine };

            return _converteZipService.Converte(list);
        }

        #region "Other Tests"

        public IActionResult Index()
        {
            //return View(_queriesService.GetHero(""));
            return View();
        }

        public JsonResult CustomerWithAPI() 
        {
            try
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
            catch (Exception ex)
            {
                return Json("404");
            }
        }

        public JsonResult UserWithoutApi()
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
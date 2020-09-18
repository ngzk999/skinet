using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseController
    {
        [HttpGet]
        public ActionResult GetError(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
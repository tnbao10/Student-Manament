using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WebAPI.Dtos;
using WebAPI.Services;

namespace WebAPI.Controllers;



[Route("api/student")]
public class StudentController : Controller
{
    private StudentService studentService;

    public StudentController(StudentService _studentService)
    {
        studentService = _studentService;
    }


    [Produces("application/json")]
    [HttpGet("finddto/{id}")]
    public IActionResult FindDTO(int id)
    {
        try
        {
            return Ok(studentService.findById(id));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findAllDTO")]
    public IActionResult FindAllDTO()
    {
        try
        {
            return Ok(studentService.findAllDTO());
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpGet("findByKeywordDTO/{keyword}")]
    public IActionResult findByKeywordDTO(string keyword)
    {
        try
        {
            return Ok(studentService.findByKeywordDTO(keyword));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("createDTO")]
    public IActionResult CreateDTO(string studentjson)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd/MM/yyyy" });
        var studentDto = JsonConvert.DeserializeObject<StudentDto>(studentjson);
        
        try
        {
            return Ok(new
            {
                Result = studentService.createDTO(studentDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [HttpDelete("delete/{id}")]
    public IActionResult Delete(int id)
    {
        try
        {
            return Ok(new
            {
                Result = studentService.delete(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPut("updateDTO")]
    public IActionResult UpdateDTO(string studentjson)
    {
        var setting = new JsonSerializerSettings();
        setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "dd/MM/yyyy" });
        var studentDto = JsonConvert.DeserializeObject<StudentDto>(studentjson);
        try
        {
            return Ok(new
            {
                Result = studentService.updateDTO(studentDto)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}

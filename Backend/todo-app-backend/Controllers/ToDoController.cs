using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_app_backend.Models;
using todo_app_backend.Services;

namespace todo_app_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : Controller
    {
        // GET: ToDoController
        [Route("all")]
        [HttpGet]
        public IEnumerable<ToDo> Get()
        {
            return ToDoServices.SelectAllToDo();
        }

        // GET: ToDoController/Details/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var ToDoExist = ToDoServices.SelectToDo(id);
            if (ModelState.IsValid && ToDoExist != null)
            {
                return new JsonResult(ToDoServices.SelectToDo(id));
            }
            else
            {
                return new JsonResult("Task does not exists.");
            }
        }

        // GET: ToDoController/Create
        [Route("Create")]
        [HttpPost]
        public JsonResult Post([FromBody] ToDo todo)
        {
            ToDoValidator validator = new ToDoValidator();

            FluentValidation.Results.ValidationResult? result = validator.Validate(todo);

            if (!result.IsValid)
            {
                foreach (var failure in result.Errors)
                {
                    return new JsonResult("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }
            ToDoServices.CreateToDo(todo.Name, todo.DateBegin, todo.DateEnd, todo.IsCompleted);
            return new JsonResult("Task created");
        }

        
        //[Route("Update")]
        [HttpPut("{id}")]
        public JsonResult Update([FromRoute] int id, [FromForm] ToDo todo)
        {
            if (ModelState.IsValid)
            {
                var todoExist = ToDoServices.SelectToDo(id);
                if (todoExist != null)
                {
                    ToDoServices.UpdateToDo(todo);
                }
                else
                {
                    return new JsonResult("Task does not exists.");
                }
            }
            return new JsonResult("Task updated");
        }

        // DELETE api/<ToDoController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            if (ModelState.IsValid)
            {
                var todoExist = ToDoServices.SelectToDo(id);
                if (todoExist != null)
                {
                    ToDoServices.DeleteToDo(id);
                }
                else
                {
                    return new JsonResult("Task does not exist");
                }
            }
            return new JsonResult($"Task deleted on ID {id}");
        }

       
    }
}

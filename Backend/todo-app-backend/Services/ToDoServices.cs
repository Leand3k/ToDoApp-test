using Microsoft.EntityFrameworkCore;
using todo_app_backend.Models;


namespace todo_app_backend.Services
{
    public class ToDoServices
    {
        // Create single ToDo
        public static string CreateToDo(string name, string dateBegin, string dateEnd, bool status)
        {
            var db = new DbsetupContext();

            {
                // Instance of ToDo for new Task
                var task = new ToDo()
                {
                    Name = name,
                    DateBegin = dateBegin,
                    DateEnd = dateEnd,
                    IsCompleted = status
                };

                db.Add(task);
                db.SaveChanges();
                return "Task created";
            }


        }

        // Select All ToDo
        public static IEnumerable<ToDo> SelectAllToDo()
        {
            var db = new DbsetupContext();

            return db.ToDo.ToList();
        }

        // Select One ToDo
        public static ToDo SelectToDo(int id)
        {
            var db = new DbsetupContext();

            return db.ToDo.FirstOrDefault(x => x.ToDoID == id);
        }

        // Update ToDo
        public static async void UpdateToDo(ToDo todo)
        {
            var db = new DbsetupContext();

            {
                var UpdatedToDo = await db.ToDo.FirstOrDefaultAsync(todosearch => todosearch.ToDoID == todo.ToDoID);

                UpdatedToDo.ToDoID = todo.ToDoID;
                UpdatedToDo.Name = todo.Name;
                UpdatedToDo.DateBegin= todo.DateBegin;
                UpdatedToDo.DateEnd= todo.DateEnd;
                UpdatedToDo.IsCompleted=todo.IsCompleted;
                await db.SaveChangesAsync();
            }
        }

        // Delete single ToDo
        public static async void DeleteToDo(int id)
        {
            var db = new DbsetupContext();

            var ToDoToBeDeleted = new ToDo()
            {
                ToDoID = id
            };

            db.ToDo.Attach(ToDoToBeDeleted);

            db.ToDo.Remove(ToDoToBeDeleted);
            await db.SaveChangesAsync();
        }
    }
}

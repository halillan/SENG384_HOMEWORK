import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_API_URL": "http://localhost:5000/api"};import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=f9eb63f2"; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"];
import { Routes, Route, Link, useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=60e13272";
import axios from "/node_modules/.vite/deps/axios.js?v=c272c8e9";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      await axios.post(`${API_URL}/people`, {
        full_name: fullName,
        email
      });
      setSuccess("Registration successful!");
      setFullName("");
      setEmail("");
      setTimeout(() => navigate("/people"), 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Error submitting form.");
      }
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card form-card" }, /* @__PURE__ */ React.createElement("h2", null, "Register Person"), error && /* @__PURE__ */ React.createElement("div", { className: "alert error" }, error), success && /* @__PURE__ */ React.createElement("div", { className: "alert success" }, success), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React.createElement("div", { className: "input-group" }, /* @__PURE__ */ React.createElement("label", null, "Full Name"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: fullName,
      onChange: (e) => setFullName(e.target.value),
      required: true,
      placeholder: "e.g. John Doe"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "input-group" }, /* @__PURE__ */ React.createElement("label", null, "Email"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
      placeholder: "e.g. john@example.com"
    }
  )), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn btn-primary" }, "Submit")), /* @__PURE__ */ React.createElement("div", { className: "link-container" }, /* @__PURE__ */ React.createElement(Link, { to: "/people", className: "btn btn-secondary" }, "View People List"))));
}
function PeopleList() {
  const [people, setPeople] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ full_name: "", email: "" });
  const fetchPeople = async () => {
    try {
      const response = await axios.get(`${API_URL}/people`);
      setPeople(response.data);
    } catch (err) {
      console.error("Error fetching people", err);
    }
  };
  useEffect(() => {
    fetchPeople();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      try {
        await axios.delete(`${API_URL}/people/${id}`);
        fetchPeople();
      } catch (err) {
        console.error("Error deleting person", err);
      }
    }
  };
  const startEdit = (person) => {
    setEditingId(person.id);
    setEditForm({ full_name: person.full_name, email: person.email });
  };
  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`${API_URL}/people/${id}`, editForm);
      setEditingId(null);
      fetchPeople();
    } catch (err) {
      console.error("Error updating person", err);
      alert("Error updating person. Maybe email already exists.");
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "card list-card" }, /* @__PURE__ */ React.createElement("h2", null, "People List"), /* @__PURE__ */ React.createElement("div", { className: "link-container-top" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "btn btn-secondary" }, "← Back to Registration")), /* @__PURE__ */ React.createElement("div", { className: "table-responsive" }, /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "ID"), /* @__PURE__ */ React.createElement("th", null, "Full Name"), /* @__PURE__ */ React.createElement("th", null, "Email"), /* @__PURE__ */ React.createElement("th", null, "Actions"))), /* @__PURE__ */ React.createElement("tbody", null, people.map((person) => /* @__PURE__ */ React.createElement("tr", { key: person.id }, /* @__PURE__ */ React.createElement("td", null, person.id), /* @__PURE__ */ React.createElement("td", null, editingId === person.id ? /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: editForm.full_name,
      onChange: (e) => setEditForm({ ...editForm, full_name: e.target.value })
    }
  ) : person.full_name), /* @__PURE__ */ React.createElement("td", null, editingId === person.id ? /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: editForm.email,
      onChange: (e) => setEditForm({ ...editForm, email: e.target.value })
    }
  ) : person.email), /* @__PURE__ */ React.createElement("td", null, editingId === person.id ? /* @__PURE__ */ React.createElement("div", { className: "action-buttons" }, /* @__PURE__ */ React.createElement("button", { onClick: () => handleEditSubmit(person.id), className: "btn btn-success" }, "Save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingId(null), className: "btn btn-warning" }, "Cancel")) : /* @__PURE__ */ React.createElement("div", { className: "action-buttons" }, /* @__PURE__ */ React.createElement("button", { onClick: () => startEdit(person), className: "btn btn-edit" }, "Edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => handleDelete(person.id), className: "btn btn-delete" }, "Delete"))))), people.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: "4", className: "text-center" }, "No people found.")))))));
}
function App() {
  return /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, { path: "/", element: /* @__PURE__ */ React.createElement(RegistrationForm, null) }), /* @__PURE__ */ React.createElement(Route, { path: "/people", element: /* @__PURE__ */ React.createElement(PeopleList, null) }));
}
export default App;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlcywgUm91dGUsIExpbmssIHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBBUElfVVJMID0gaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo1MDAxL2FwaSc7XG5cbmZ1bmN0aW9uIFJlZ2lzdHJhdGlvbkZvcm0oKSB7XG4gIGNvbnN0IFtmdWxsTmFtZSwgc2V0RnVsbE5hbWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHNldEVycm9yKCcnKTtcbiAgICBzZXRTdWNjZXNzKCcnKTtcblxuICAgIC8vIEJhc2ljIGVtYWlsIHJlZ2V4XG4gICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xuICAgIGlmICghZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgICAgc2V0RXJyb3IoJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGF4aW9zLnBvc3QoYCR7QVBJX1VSTH0vcGVvcGxlYCwge1xuICAgICAgICBmdWxsX25hbWU6IGZ1bGxOYW1lLFxuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH0pO1xuICAgICAgc2V0U3VjY2VzcygnUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwhJyk7XG4gICAgICBzZXRGdWxsTmFtZSgnJyk7XG4gICAgICBzZXRFbWFpbCgnJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IG5hdmlnYXRlKCcvcGVvcGxlJyksIDE1MDApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuZGF0YSAmJiBlcnIucmVzcG9uc2UuZGF0YS5lcnJvcikge1xuICAgICAgICBzZXRFcnJvcihlcnIucmVzcG9uc2UuZGF0YS5lcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRFcnJvcignRXJyb3Igc3VibWl0dGluZyBmb3JtLicpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQgZm9ybS1jYXJkXCI+XG4gICAgICAgIDxoMj5SZWdpc3RlciBQZXJzb248L2gyPlxuICAgICAgICB7ZXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBlcnJvclwiPntlcnJvcn08L2Rpdj59XG4gICAgICAgIHtzdWNjZXNzICYmIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgc3VjY2Vzc1wiPntzdWNjZXNzfTwvZGl2Pn1cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgPGxhYmVsPkZ1bGwgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgIHZhbHVlPXtmdWxsTmFtZX0gXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RnVsbE5hbWUoZS50YXJnZXQudmFsdWUpfSBcbiAgICAgICAgICAgICAgcmVxdWlyZWQgXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBKb2huIERvZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbD5FbWFpbDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiIFxuICAgICAgICAgICAgICB2YWx1ZT17ZW1haWx9IFxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX0gXG4gICAgICAgICAgICAgIHJlcXVpcmVkIFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gam9obkBleGFtcGxlLmNvbVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGluay1jb250YWluZXJcIj5cbiAgICAgICAgICA8TGluayB0bz1cIi9wZW9wbGVcIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiPlZpZXcgUGVvcGxlIExpc3Q8L0xpbms+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFBlb3BsZUxpc3QoKSB7XG4gIGNvbnN0IFtwZW9wbGUsIHNldFBlb3BsZV0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtlZGl0aW5nSWQsIHNldEVkaXRpbmdJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2VkaXRGb3JtLCBzZXRFZGl0Rm9ybV0gPSB1c2VTdGF0ZSh7IGZ1bGxfbmFtZTogJycsIGVtYWlsOiAnJyB9KTtcblxuICBjb25zdCBmZXRjaFBlb3BsZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYCR7QVBJX1VSTH0vcGVvcGxlYCk7XG4gICAgICBzZXRQZW9wbGUocmVzcG9uc2UuZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwZW9wbGUnLCBlcnIpO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoUGVvcGxlKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSBhc3luYyAoaWQpID0+IHtcbiAgICBpZiAod2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBwZXJzb24/JykpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLmRlbGV0ZShgJHtBUElfVVJMfS9wZW9wbGUvJHtpZH1gKTtcbiAgICAgICAgZmV0Y2hQZW9wbGUoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyBwZXJzb24nLCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBzdGFydEVkaXQgPSAocGVyc29uKSA9PiB7XG4gICAgc2V0RWRpdGluZ0lkKHBlcnNvbi5pZCk7XG4gICAgc2V0RWRpdEZvcm0oeyBmdWxsX25hbWU6IHBlcnNvbi5mdWxsX25hbWUsIGVtYWlsOiBwZXJzb24uZW1haWwgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRWRpdFN1Ym1pdCA9IGFzeW5jIChpZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBheGlvcy5wdXQoYCR7QVBJX1VSTH0vcGVvcGxlLyR7aWR9YCwgZWRpdEZvcm0pO1xuICAgICAgc2V0RWRpdGluZ0lkKG51bGwpO1xuICAgICAgZmV0Y2hQZW9wbGUoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHBlcnNvbicsIGVycik7XG4gICAgICBhbGVydCgnRXJyb3IgdXBkYXRpbmcgcGVyc29uLiBNYXliZSBlbWFpbCBhbHJlYWR5IGV4aXN0cy4nKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkIGxpc3QtY2FyZFwiPlxuICAgICAgICA8aDI+UGVvcGxlIExpc3Q8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpbmstY29udGFpbmVyLXRvcFwiPlxuICAgICAgICAgICA8TGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiPuKGkCBCYWNrIHRvIFJlZ2lzdHJhdGlvbjwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtcmVzcG9uc2l2ZVwiPlxuICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aD5JRDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPkZ1bGwgTmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPkVtYWlsPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+QWN0aW9uczwvdGg+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7cGVvcGxlLm1hcCgocGVyc29uKSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyIGtleT17cGVyc29uLmlkfT5cbiAgICAgICAgICAgICAgICAgIDx0ZD57cGVyc29uLmlkfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgIHtlZGl0aW5nSWQgPT09IHBlcnNvbi5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRGb3JtLmZ1bGxfbmFtZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRGb3JtKHsuLi5lZGl0Rm9ybSwgZnVsbF9uYW1lOiBlLnRhcmdldC52YWx1ZX0pfSBcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5mdWxsX25hbWVcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgIHtlZGl0aW5nSWQgPT09IHBlcnNvbi5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtlZGl0Rm9ybS5lbWFpbH0gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRGb3JtKHsuLi5lZGl0Rm9ybSwgZW1haWw6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmVtYWlsXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICB7ZWRpdGluZ0lkID09PSBwZXJzb24uaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpb24tYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVFZGl0U3VibWl0KHBlcnNvbi5pZCl9IGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2Vzc1wiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0RWRpdGluZ0lkKG51bGwpfSBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmdcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbi1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHN0YXJ0RWRpdChwZXJzb24pfSBjbGFzc05hbWU9XCJidG4gYnRuLWVkaXRcIj5FZGl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZShwZXJzb24uaWQpfSBjbGFzc05hbWU9XCJidG4gYnRuLWRlbGV0ZVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAge3Blb3BsZS5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPVwiNFwiIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Tm8gcGVvcGxlIGZvdW5kLjwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXBwKCkge1xuICByZXR1cm4gKFxuICAgIDxSb3V0ZXM+XG4gICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8UmVnaXN0cmF0aW9uRm9ybSAvPn0gLz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiL3Blb3BsZVwiIGVsZW1lbnQ9ezxQZW9wbGVMaXN0IC8+fSAvPlxuICAgIDwvUm91dGVzPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsVUFBVSxpQkFBaUI7QUFDcEMsU0FBUyxRQUFRLE9BQU8sTUFBTSxtQkFBbUI7QUFDakQsT0FBTyxXQUFXO0FBRWxCLE1BQU0sVUFBVSxZQUFZLElBQUksZ0JBQWdCO0FBRWhELFNBQVMsbUJBQW1CO0FBQzFCLFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUFTLEVBQUU7QUFDM0MsUUFBTSxDQUFDLE9BQU8sUUFBUSxJQUFJLFNBQVMsRUFBRTtBQUNyQyxRQUFNLENBQUMsT0FBTyxRQUFRLElBQUksU0FBUyxFQUFFO0FBQ3JDLFFBQU0sQ0FBQyxTQUFTLFVBQVUsSUFBSSxTQUFTLEVBQUU7QUFDekMsUUFBTSxXQUFXLFlBQVk7QUFFN0IsUUFBTSxlQUFlLE9BQU8sTUFBTTtBQUNoQyxNQUFFLGVBQWU7QUFDakIsYUFBUyxFQUFFO0FBQ1gsZUFBVyxFQUFFO0FBR2IsVUFBTSxhQUFhO0FBQ25CLFFBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxHQUFHO0FBQzNCLGVBQVMscUNBQXFDO0FBQzlDO0FBQUEsSUFDRjtBQUVBLFFBQUk7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
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      admin: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const type = e.target.type;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="nom">Email</label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
            name="password"
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
            name="username"
          />
        </div>
        <div>
          <label htmlFor="admin">L'utilisateur est-il admin</label>
          <input
            type="checkbox"
            checked={this.state.admin}
            onChange={this.handleChange}
            id="admin"
            name="admin"
          />
        </div>
      </div>
    );
  }
}

ReactDom.render(<Register />, document.querySelector("#app"));

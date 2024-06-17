import React, { Component, ChangeEvent, FormEvent } from "react";
import "./Compiler.css";

interface CompilerState {
  input: string;
  output: string;
  language_id: number;
  user_input: string;
}

interface JsonResponse {
  token: string;
}

interface JsonGetSolution {
  status: { description: string };
  stdout?: string;
  time?: string;
  memory?: string;
  stderr?: string;
  compile_output?: string;
}

export default class Compiler extends Component<{}, CompilerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      input: localStorage.getItem("input") || ``,
      output: ``,
      language_id: Number(localStorage.getItem("language_Id")) || 2,
      user_input: ``,
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const input = event.target.value;
    this.setState({ input });
    localStorage.setItem("input", input);
  };

  handleUserInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const user_input = event.target.value;
    this.setState({ user_input });
  };

  handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const language_id = Number(event.target.value);
    this.setState({ language_id });
    localStorage.setItem("language_Id", event.target.value);
  };

  handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const outputText = document.getElementById("output") as HTMLTextAreaElement;
    outputText.innerHTML = "Creating Submission ...\n";

    const response = await fetch("https://judge0-extra-ce.p.rapidapi.com/about", {
      method: "POST",
      headers: {
        "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
        "x-rapidapi-key": "3991985dd2msh94e632ba672b516p14fc8cjsn6b7eb410d4d7",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        source_code: this.state.input,
        stdin: this.state.user_input,
        language_id: this.state.language_id,
      }),
    });

    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse: JsonResponse = await response.json();

    let jsonGetSolution: JsonGetSolution = {
      status: { description: "Queue" },
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        const url = `https://judge0-extra-ce.p.rapidapi.com/about/${jsonResponse.token}?base64_encoded=true`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
            "content-type": "application/json",
          },
        });
        jsonGetSolution = await getSolution.json();
      }
    }

    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      outputText.innerHTML = `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      outputText.innerHTML = `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output!);
      outputText.innerHTML = `\n Error :${compilation_error}`;
    }
  };

  render() {
    return (
      <>
        <div className="row container-fluid">
          <div className="col-6 ml-4 ">
            <label htmlFor="solution">
              <span className="badge badge-info heading mt-2">
                <i className="fas fa-code fa-fw fa-lg"></i> Code Here
              </span>
            </label>
            <textarea
              required
              name="solution"
              id="source"
              onChange={this.handleInputChange}
              className="source"
              value={this.state.input}
            ></textarea>
            <button
              type="submit"
              className="btn btn-danger ml-2 mr-2"
              onClick={this.handleSubmit}
            >
              <i className="fas fa-cog fa-fw"></i> Run
            </button>

            <label htmlFor="tags" className="mr-1">
              <b className="heading">Language:</b>
            </label>
            <select
              value={this.state.language_id}
              onChange={this.handleLanguageChange}
              id="tags"
              className="form-control form-inline mb-2 language"
            >
              <option value="54">C++</option>
              <option value="50">C</option>
              <option value="62">Java</option>
              <option value="71">Python</option>
            </select>
          </div>
          <div className="col-5">
            <div>
              <span className="badge badge-info heading my-2">
                <i className="fas fa-exclamation fa-fw fa-md"></i> Output
              </span>
              <textarea id="output"></textarea>
            </div>
          </div>
        </div>
        <div className="mt-2 ml-5">
          <span className="badge badge-primary heading my-2">
            <i className="fas fa-user fa-fw fa-md"></i> User Input
          </span>
          <br />
          <textarea id="input" onChange={this.handleUserInputChange}></textarea>
        </div>
      </>
    );
  }
}
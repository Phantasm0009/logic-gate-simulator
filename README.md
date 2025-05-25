# Logic Gate Simulator

## Project Overview
The Logic Gate Simulator is an interactive web application designed to help middle school students explore digital logic, Boolean algebra, and basic circuitry concepts. Through a drag-and-drop interface, users can connect virtual logic gates (AND, OR, NOT, NAND, NOR, XOR) to control LEDs based on binary inputs from switches.

## Features
- **Drag-and-Drop Interface**: Users can easily drag gates from a toolbox onto a workspace.
- **Wire Connections**: Connect gate outputs to other gate inputs or LEDs with click-and-drag functionality.
- **Interactive Inputs & Outputs**: Toggle switches to change binary inputs and see LEDs light up based on circuit configurations.
- **Truth Table Generator**: Automatically generates a truth table based on the current circuit, reinforcing understanding of Boolean algebra.
- **Circuit Sharing**: Export circuits as files or share them via URL, perfect for teachers sharing challenges with students.
- **Challenge Mode**: Engage in logic puzzles by building circuits to meet specific conditions.

## STEM Concepts Covered
- **Technology**: Introduction to digital systems and how computers operate at the logic level.
- **Engineering**: Design and logical construction of simple circuits and systems.
- **Mathematics**: Understanding Boolean algebra and truth tables.
- **Computer Science Foundations**: Insight into how processors and circuits interpret binary input.

## Tech Stack
- **Frontend**: HTML, CSS
- **Logic & UI**: JavaScript (vanilla or framework) with SVG or HTML Canvas for visual layout
- **Optional Extras**: 
  - LocalStorage for saving circuits
  - Snap-to-grid functionality for a polished user experience
  - Audio or visual feedback for successful circuit configurations

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/logic-gate-simulator.git
   ```
2. Navigate to the project directory:
   ```
   cd logic-gate-simulator
   ```
3. Open `index.html` in your web browser to start using the simulator.

## Development with NPM

### Prerequisites
- Node.js (v14 or newer recommended)
- npm (v6 or newer)

### Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```
3. Open your browser and go to `http://localhost:3000` to see the simulator in action.

## Circuit Sharing Feature

The Logic Gate Simulator includes a powerful circuit sharing system designed to make collaborative learning easier. This feature is especially useful for:

- **Teachers**: Create circuit challenges and share them with students
- **Students**: Submit completed circuits for review
- **Collaboration**: Work together on complex circuit designs

### How to Use Circuit Sharing

#### Exporting Circuits
1. Click on the Share button (🔗) in the toolbar
2. In the sharing panel, enter a filename for your circuit
3. Click "Export" to download your circuit as a .circuit file

#### Creating Shareable Links
1. Open the sharing panel by clicking the Share button
2. Click "Create Shareable Link"
3. Copy the generated URL using the copy button
4. Share this URL with anyone who needs to view your circuit

#### Importing Circuits
1. Click on the Share button to open the sharing panel
2. Click "Import from File" and select a .circuit file
3. The circuit will automatically load into your workspace

#### Using Shareable Links
1. When someone sends you a circuit link, simply open it in your browser
2. The circuit will automatically load when the page opens

### Example Circuits

The `examples` directory contains some sample circuits you can use to test the sharing functionality:

- `basic-and-gate.circuit`: A simple AND gate with two inputs and one output
- `half-adder.circuit`: A half adder circuit with sum and carry outputs
- `binary-counter.circuit`: A 4-bit binary counter with display

### Testing the Circuit Sharing Feature

We've included special test pages to help verify the circuit sharing functionality:

1. **test-examples.html**: View and open example circuits directly
   ```
   npm run examples
   ```
   This will open the examples page directly in your browser

2. **test-url-sharing.html**: Generate shareable URLs for testing the import functionality
   ```
   npm run url-test
   ```
   This will open the URL testing page directly in your browser

3. **Teacher Tools**: Create and manage circuit challenges for students
   ```
   npm run teacher
   ```
   This will start the interactive teacher tools console application

These test pages will help you understand how the circuit sharing works and allow you to test both the export and import functionality.

## For Teachers: Creating Circuit Challenges

This simulator includes special tools designed for teachers who want to create circuit challenges for their students:

#### Using the Teacher Tools Script

A command-line utility is included to help teachers create and manage challenges:

```
node teacher-tools.js
```

This tool allows you to:
1. Convert example circuits into structured challenges
2. Add descriptions, difficulty levels, and success criteria
3. Include hints for students
4. Generate shareable links that can be sent to students

#### Creating a Challenge Manually

1. Design your circuit in the simulator
2. Use the Share button to create a shareable URL
3. Send the URL to your students with instructions
4. Students can open the URL and the circuit will load automatically

#### Assessing Student Solutions

When students complete a challenge, they can:
1. Create a shareable URL of their solution
2. Send it back to you for assessment
3. You can open their solution to verify it works as expected

This workflow makes it easy to create interactive assignments and provide feedback on student work.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
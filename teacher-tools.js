/**
 * Teacher Tools - Helper functions for creating circuit challenges
 * 
 * This file contains utility functions to help teachers create,
 * save, and share logic circuit challenges with students.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create a new challenge directory if it doesn't exist
const challengesDir = path.join(__dirname, 'challenges');
if (!fs.existsSync(challengesDir)) {
  fs.mkdirSync(challengesDir);
}

/**
 * Save a circuit challenge file
 * @param {string} name - Challenge name
 * @param {object} circuit - Circuit data
 * @param {object} metadata - Challenge metadata
 */
function saveChallenge(name, circuit, metadata) {
  const filename = path.join(challengesDir, `${name.toLowerCase().replace(/\s+/g, '-')}.challenge.json`);
  
  const challengeData = {
    name,
    circuit,
    metadata,
    createdAt: new Date().toISOString()
  };
  
  fs.writeFileSync(filename, JSON.stringify(challengeData, null, 2));
  console.log(`Challenge saved to ${filename}`);
}

/**
 * Convert an example circuit into a challenge
 */
function convertExampleToChallenge() {
  console.log('Converting example circuit to challenge...');
  
  // List available examples
  const examplesDir = path.join(__dirname, 'examples');
  const examples = fs.readdirSync(examplesDir).filter(file => file.endsWith('.circuit'));
  
  console.log('\nAvailable example circuits:');
  examples.forEach((example, index) => {
    console.log(`${index + 1}. ${example}`);
  });
  
  // Prompt for example selection
  rl.question('\nSelect example number: ', (exampleIndex) => {
    const selectedExample = examples[parseInt(exampleIndex) - 1];
    
    if (!selectedExample) {
      console.error('Invalid selection');
      rl.close();
      return;
    }
    
    // Read the example circuit
    const circuitPath = path.join(examplesDir, selectedExample);
    const circuit = JSON.parse(fs.readFileSync(circuitPath, 'utf8'));
    
    // Gather challenge metadata
    rl.question('Challenge name: ', (name) => {
      rl.question('Description: ', (description) => {
        rl.question('Difficulty (beginner/intermediate/advanced): ', (difficulty) => {
          rl.question('Time limit (minutes, 0 for none): ', (timeLimit) => {
            rl.question('Success criteria (e.g., "LED should light up when both switches are on"): ', (successCriteria) => {
              
              // Create metadata
              const metadata = {
                description,
                difficulty: difficulty.toLowerCase(),
                timeLimit: parseInt(timeLimit) || 0,
                successCriteria,
                hints: []
              };
              
              // Ask for optional hints
              const askForHint = () => {
                rl.question('Add a hint (leave empty to finish): ', (hint) => {
                  if (hint.trim()) {
                    metadata.hints.push(hint);
                    askForHint();
                  } else {
                    // Save the challenge
                    saveChallenge(name, circuit, metadata);
                    
                    // Generate a shareable URL
                    console.log('\nTo share this challenge:');
                    console.log('1. Open test-url-sharing.html in the simulator');
                    console.log('2. Select the example that this challenge is based on');
                    console.log('3. Generate and copy the shareable URL');
                    console.log('4. Share the URL with your students');
                    
                    rl.close();
                  }
                });
              };
              
              askForHint();
            });
          });
        });
      });
    });
  });
}

/**
 * Main menu
 */
function showMenu() {
  console.log('\n=== Teacher Tools for Logic Gate Simulator ===');
  console.log('1. Convert an example circuit to a challenge');
  console.log('2. List saved challenges');
  console.log('3. Exit');
  
  rl.question('\nSelect an option: ', (option) => {
    switch(option) {
      case '1':
        convertExampleToChallenge();
        break;
      case '2':
        listChallenges();
        break;
      case '3':
        rl.close();
        break;
      default:
        console.log('Invalid option');
        showMenu();
    }
  });
}

/**
 * List saved challenges
 */
function listChallenges() {
  const challenges = fs.readdirSync(challengesDir).filter(file => file.endsWith('.challenge.json'));
  
  if (challenges.length === 0) {
    console.log('No challenges found. Create one first!');
    showMenu();
    return;
  }
  
  console.log('\nSaved challenges:');
  challenges.forEach((challenge, index) => {
    const data = JSON.parse(fs.readFileSync(path.join(challengesDir, challenge), 'utf8'));
    console.log(`${index + 1}. ${data.name} (${data.metadata.difficulty})`);
    console.log(`   ${data.metadata.description}`);
    console.log(`   Created: ${new Date(data.createdAt).toLocaleDateString()}`);
    console.log('');
  });
  
  rl.question('Press Enter to continue...', () => {
    showMenu();
  });
}

// Start the application
console.log('Welcome to the Logic Gate Simulator Teacher Tools');
showMenu();

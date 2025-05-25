/**
 * Utility to analyze circuits and provide real-world examples
 */

// Circuit patterns that map to real-world examples
const REAL_WORLD_PATTERNS = {
  // Basic gate patterns
  AND_GATE: {
    message: "AND gates are used in security systems where multiple conditions must be true - like a door being closed AND the correct code entered.",
    conditions: (nodes, edges) => hasGateType(nodes, 'andGate') && nodes.length < 5
  },
  OR_GATE: {
    message: "OR gates are used in alarm systems to trigger when any sensor is activated, like motion OR window OR door sensors.",
    conditions: (nodes, edges) => hasGateType(nodes, 'orGate') && nodes.length < 5
  },
  NOT_GATE: {
    message: "NOT gates (inverters) are used in real systems to detect when something is missing or a condition fails, like a smoke detector alerting when clean air is NOT detected.",
    conditions: (nodes, edges) => hasGateType(nodes, 'notGate') && nodes.length < 4
  },
  
  // More complex patterns
  VOTING_SYSTEM: {
    message: "Your circuit resembles a voting system where multiple inputs are combined to make a single decision, similar to how electronic voting machines work.",
    conditions: (nodes, edges) => 
      nodes.filter(n => n.type === 'switch').length >= 3 && 
      (hasGateType(nodes, 'andGate') || hasGateType(nodes, 'orGate'))
  },
  ALARM_SYSTEM: {
    message: "This circuit behaves like a real alarm system where different sensors trigger alerts, used in home security systems and fire alarms.",
    conditions: (nodes, edges) => 
      hasGateType(nodes, 'orGate') && 
      nodes.filter(n => n.type === 'switch').length >= 2 && 
      (nodes.filter(n => n.type === 'led').length > 0 || nodes.filter(n => n.type === 'multiLED').length > 0)
  },
  DOOR_LOCK: {
    message: "Your circuit resembles an electronic door lock system that requires specific conditions to be met before unlocking, used in secure facilities.",
    conditions: (nodes, edges) => 
      hasGateType(nodes, 'andGate') && 
      nodes.filter(n => n.type === 'switch').length >= 2 &&
      nodes.filter(n => n.type === 'led').length > 0
  },
  ENCODER_SYSTEM: {
    message: "This encoder circuit is similar to systems used in computer keyboards and input devices to convert multiple button presses into digital codes.",
    conditions: (nodes, edges) => hasGateType(nodes, 'binaryEncoder')
  },
  DECODER_SYSTEM: {
    message: "Decoders like this are used in memory addressing in computers, converting binary addresses to select specific memory locations.",
    conditions: (nodes, edges) => hasGateType(nodes, 'binaryDecoder')
  },
  COMPARATOR_SYSTEM: {
    message: "Binary comparators are used in real-world temperature control systems and sorting machines to make equality or greater/less than decisions.",
    conditions: (nodes, edges) => hasGateType(nodes, 'binaryComparator')
  },
  MULTIPLEXER_SYSTEM: {
    message: "Multiplexers are used in telecommunication systems to combine multiple signals into one channel, like how cable TV delivers many channels over one wire.",
    conditions: (nodes, edges) => hasGateType(nodes, 'multiplexer')
  },
  ADDER_CIRCUIT: {
    message: "This adder circuit is the fundamental building block of arithmetic units in CPUs, performing all the calculations in your computer.",
    conditions: (nodes, edges) => 
      hasGateType(nodes, 'halfAdder') || hasGateType(nodes, 'fullAdder')
  },
  DISPLAY_CIRCUIT: {
    message: "This display circuit is similar to those used in digital scoreboard systems and numerical displays in electronics.",
    conditions: (nodes, edges) => hasGateType(nodes, 'binaryDisplay')
  }
};

// Helper function to check if nodes contain a specific gate type
function hasGateType(nodes, gateType) {
  return nodes.some(node => node.type === gateType);
}

/**
 * Analyzes the current circuit and returns real-world examples
 * @param {Array} nodes - Circuit nodes
 * @param {Array} edges - Circuit edges
 * @returns {Array} - Applicable real-world example messages
 */
export function analyzeCircuitForRealWorldExamples(nodes, edges) {
  const examples = [];
  
  // Check each pattern against the current circuit
  Object.entries(REAL_WORLD_PATTERNS).forEach(([patternName, pattern]) => {
    if (pattern.conditions(nodes, edges)) {
      examples.push({
        type: patternName,
        message: pattern.message
      });
    }
  });
  
  return examples;
}

/**
 * Gets a single random example from all applicable examples
 * @param {Array} nodes - Circuit nodes
 * @param {Array} edges - Circuit edges
 * @returns {Object|null} - A real-world example or null if none apply
 */
export function getRandomRealWorldExample(nodes, edges) {
  const examples = analyzeCircuitForRealWorldExamples(nodes, edges);
  
  if (examples.length === 0) {
    return null;
  }
  
  // Return a random example from the applicable ones
  const randomIndex = Math.floor(Math.random() * examples.length);
  return examples[randomIndex];
}

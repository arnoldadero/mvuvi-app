// Script to check Tamagui configuration
const fs = require('fs');
const path = require('path');

console.log('Checking Tamagui configuration...');

// Check if tamagui.config.ts exists
const tamaguiConfigPath = path.join(__dirname, 'tamagui.config.ts');
if (fs.existsSync(tamaguiConfigPath)) {
  console.log('✅ tamagui.config.ts found');
} else {
  console.log('❌ tamagui.config.ts not found');
}

// Check if .tamaguirc.js exists
const tamaguiRcPath = path.join(__dirname, '.tamaguirc.js');
if (fs.existsSync(tamaguiRcPath)) {
  console.log('✅ .tamaguirc.js found');
} else {
  console.log('❌ .tamaguirc.js not found');
}

// Check babel.config.js for Tamagui plugin
const babelConfigPath = path.join(__dirname, 'babel.config.js');
if (fs.existsSync(babelConfigPath)) {
  const babelConfig = fs.readFileSync(babelConfigPath, 'utf8');
  if (babelConfig.includes('@tamagui/babel-plugin')) {
    console.log('✅ @tamagui/babel-plugin found in babel.config.js');
  } else {
    console.log('❌ @tamagui/babel-plugin not found in babel.config.js');
  }
} else {
  console.log('❌ babel.config.js not found');
}

// Check package.json for Tamagui dependencies
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredDeps = [
    'tamagui',
    '@tamagui/core',
    '@tamagui/config',
    '@tamagui/web',
    '@tamagui/font-inter',
    '@tamagui/themes',
    '@tamagui/shorthands'
  ];
  
  const missingDeps = requiredDeps.filter(dep => !dependencies[dep]);
  
  if (missingDeps.length === 0) {
    console.log('✅ All required Tamagui dependencies found');
  } else {
    console.log('❌ Missing Tamagui dependencies:', missingDeps.join(', '));
  }
} else {
  console.log('❌ package.json not found');
}

console.log('\nTamagui configuration check complete.');

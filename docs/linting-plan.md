# Linting Improvement Plan

This document outlines the plan for gradually re-enabling ESLint rules and fixing the associated issues in the codebase.

## Current Status

ESLint has been set up with a configuration that temporarily disables several rules to allow for a clean initial lint run. The following rules are currently disabled:

- `react-native/no-inline-styles`: Inline styles in components
- `react-native/no-color-literals`: Color literals in styles
- `react-native/no-raw-text`: Raw text outside of Text components
- `react-native/sort-styles`: Style property ordering
- `@typescript-eslint/no-explicit-any`: Usage of 'any' type
- `@typescript-eslint/no-unused-vars`: Unused variables
- `no-console`: Console statements
- `react-hooks/exhaustive-deps`: Missing dependencies in hooks

## Phased Approach

### Phase 1: Fix Basic Issues

1. **Fix unused imports and variables**
   - Re-enable `@typescript-eslint/no-unused-vars`
   - Remove or use all unused imports and variables
   - Prefix intentionally unused variables with underscore (_)

2. **Fix console statements**
   - Re-enable `no-console`
   - Replace console.log with proper logging or remove
   - Keep console.warn and console.error for important messages

### Phase 2: Improve Type Safety

1. **Fix 'any' type usage**
   - Re-enable `@typescript-eslint/no-explicit-any`
   - Replace 'any' with proper types
   - Create interfaces for complex objects
   - Use type assertions where necessary

### Phase 3: Fix React Native Specific Issues

1. **Fix raw text issues**
   - Re-enable `react-native/no-raw-text`
   - Wrap all text in <Text> components
   - Fix special characters and units in text

2. **Fix inline styles**
   - Re-enable `react-native/no-inline-styles`
   - Move inline styles to StyleSheet objects
   - Create reusable styles for common patterns

3. **Fix color literals**
   - Re-enable `react-native/no-color-literals`
   - Move color literals to a theme or constants file
   - Use theme colors consistently

4. **Fix style ordering**
   - Re-enable `react-native/sort-styles`
   - Sort style properties alphabetically
   - Sort style class names alphabetically

### Phase 4: Fix React Hooks Issues

1. **Fix exhaustive dependencies**
   - Re-enable `react-hooks/exhaustive-deps`
   - Add missing dependencies to useEffect and other hooks
   - Refactor hooks that have complex dependency requirements

## Implementation Strategy

1. Focus on one rule at a time
2. Use `yarn lint` to identify issues for the specific rule
3. Fix all issues for that rule
4. Re-enable the rule in `.eslintrc.js`
5. Verify with `yarn lint` that no new issues are introduced
6. Commit changes with a descriptive message
7. Move to the next rule

## Timeline

- Phase 1: 1-2 days
- Phase 2: 2-3 days
- Phase 3: 3-4 days
- Phase 4: 1-2 days

Total estimated time: 7-11 days, depending on the complexity of the issues found.

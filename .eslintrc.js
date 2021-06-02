module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _atoms: './src/components/atoms',
          _helpers: './src/helpers',
          _hooks: './src/hooks',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _context: './src/context',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _services: './src/services',
          _storage: './src/storage',
          _store: './src/store',  
          _styles: './src/styles',
          _utils: './src/utils'          
        },
      },
    },
  },
};
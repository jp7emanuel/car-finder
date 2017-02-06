var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'src/styles';

elixir((mix) => {
  mix.sass([
    'app.scss'
  ], 'src/styles/css/3rd-party.css');
  mix.styles([
    '3rd-party.css',
    '../../../node_modules/semantic-ui/dist/semantic.min.css',
    '../../../node_modules/slick-carousel/slick/slick.css',
    '../../../node_modules/slick-carousel/slick/slick-theme.css',
  ], 'public/css/app.css');

  mix.copy('node_modules/slick-carousel/slick/fonts', 'public/css/fonts');
});

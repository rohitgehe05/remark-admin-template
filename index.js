#!/usr/bin/env node
var program = require('commander');
var inquirer = require("inquirer");
var fse = require('fs-extra-promise')
var path = require('path');
var glob = require('globby');
var extend = require('extend');
var Applause = require('applause');
var pp = require('preprocess');
var requireFolderTree = require('require-folder-tree');
var treeify = require('treeify');
var Promise = require('bluebird');
var loadJsonFile = require('load-json-file');
var writeJsonFile = require('write-json-file');
// https://www.npmjs.com/package/applause

program
 .version('1.0.0')
 .parse(process.argv);

var defaults = {
  directory: 'generated',
  buildSystem: true,
  includeSkins: true,
  includeSource: true,
  includeExamples: true,
  includeWebpack: true
};

var questions = [
  {
    type: "input",
    name: "directory",
    message: "Which directory do you want generated to",
    default: defaults.directory,
    validate: function( value ) {
      if(fse.existsSync(value)){
        return 'The directory ' + value + ' exists. Please remove the directory. Or typping another directory.';
      }
      return true;
    },
  },
  {
    type: "list",
    name: "style",
    message: "Which style?",
    choices: [ {
      name: "Classic",
      value: 'classic'
    },{
      name: "Material",
      value: 'material',
      checked: true
    }],
    validate: function( answer ) {
      if ( answer.length < 1 ) {
        return "You must choose at least one.";
      }
      return true;
    }
  },
  {
    type: "list",
    name: "layout",
    message: "Which layout?",
    choices: [
      {
        name: "Base",
        value: 'base',
        checked: true
      },
      {
        name: "Center",
        value: 'center'
      },
      {
        name: "Iconbar",
        value: 'iconbar'
      },
      {
        name: "Mmenu",
        value: 'mmenu'
      },
      {
        name: "Topbar",
        value: 'topbar'
      },
      {
        name: "Topicon",
        value: 'topicon'
      }
    ]
  },
  {
    type: "confirm",
    name: "buildSystem",
    message: "Using build system (gulp)?",
    default: defaults.buildSystem
  },
  {
    type: "confirm",
    name: "includeSkins",
    message: "Use skins?",
    default: defaults.includeSkins
  },
  {
    type: "confirm",
    name: "includeExamples",
    message: "Include examples files?",
    default: defaults.includeExamples
  },
  {
    type: "confirm",
    name: "includeWebpack",
    message: "Include webpack sample config files?",
    default: defaults.includeWebpack
  },
  {
    type: "confirm",
    name: "includeSource",
    message: "Include Source files?",
    when: function( answers ) {
      return answers.buildSystem !== true;
    },
    default: defaults.includeSource
  },
  {
    type: "checkbox",
    name: "includeSources",
    message: "What sources to include?",
    choices: function(answers){
      var choices = [
        {
          name: "Javascript",
          value: 'js',
          checked: true
        },
        {
          name: "Sass",
          value: 'css',
          checked: true
        },
        {
          name: "Images",
          value: 'images',
          checked: true
        },
        {
          name: "Vendor",
          value: 'vendor',
          checked: true
        },
        {
          name: "Fonts's sass",
          value: 'fonts',
          checked: false
        },
        {
          name: "Html layout system",
          value: 'html',
          checked: true
        }
      ];

      if(answers.includeSkins) {
        choices.push({
          name: "Skins's sass",
          value: 'skins',
          checked: true
        });
      }

      if(answers.includeExamples) {
        choices.push({
          name: "Examples's javascript & sass",
          value: 'examples',
          checked: true
        });
      }

      return choices;
    },
    when: function( answers ) {
      return answers.includeSource !== false;
    },
    validate: function( answer ) {
      if ( answer.indexOf('css') == -1 && answer.indexOf('skins') != -1 ) {
        return "You must choose 'Sass' as Skins's sass dependency.";
      }

      if ( answer.indexOf('css') == -1 && answer.indexOf('examples') != -1 ) {
        return "You must choose 'Sass' as Examples's dependency.";
      }

      if ( answer.indexOf('js') == -1 && answer.indexOf('examples') != -1 ) {
        return "You must choose 'Javascript' as Examples's dependency.";
      }

      if ( answer.indexOf('css') == -1 && answer.indexOf('vendor') != -1 ) {
        return "You must choose 'Sass' as Vendor's dependency.";
      }

      if ( answer.indexOf('css') == -1 && answer.indexOf('fonts') != -1 ) {
        return "You must choose 'Sass' as Fonts's dependency.";
      }

      if ( answer.indexOf('html') == -1 && answer.indexOf('examples') != -1 ) {
        return "You must choose 'Html layout system' as Examples's dependency.";
      }

      return true;
    }
  }
];

inquirer.prompt( questions).then(function( answers ) {
  answers = extend(defaults, answers);

  var sourcePath = path.join(answers.style, answers.layout);
  var destPath = answers.directory;
  var globalPath = path.join(answers.style, 'global');

  /**
   * Global
   */
  var globalAssets = [
    'css/**/*',
    'fonts/**/*',
    'js/**/*',
    'vendor/**/*',
  ];

  if(answers.includeExamples) {
    globalAssets = globalAssets.concat([
      'photos/**/*',
      'portraits/**/*'
    ]);
  }

  glob(globalAssets, {
    cwd: globalPath
  }).then(function(filePaths){
    filePaths.forEach(function(filePath){
      fse.copySync(path.join(globalPath, filePath), path.join(destPath, 'assets', filePath));
    });
  });

  var globalSource = [];

  if(answers.includeSource) {
    if(answers.includeSources.indexOf('js') == -1) {
      globalSource = globalSource.concat([
        '!src/js/**/*',
        '!src/es/**/*',
      ]);
    } else {
      globalSource = globalSource.concat([
        'src/js/**/*',
        'src/es/**/*',
        'plugins.json'
      ]);
    }

    if(answers.includeSources.indexOf('css') == -1) {
      globalSource = globalSource.concat([
        '!src/scss/**/*',
      ]);
    } else {
      globalSource = globalSource.concat([
        'src/scss/**/*',
      ]);
    }

    if(answers.includeSources.indexOf('images') == -1) {
      globalSource = globalSource.concat([
        '!src/images/**/*',
      ]);
    } else {
      globalSource = globalSource.concat([
        'src/images/**/*',
      ]);
    }

    if(answers.includeSources.indexOf('skins') == -1) {
      globalSource = globalSource.concat([
        '!src/skins/**/*',
      ]);
    } else {
      globalSource = globalSource.concat([
        'src/skins/**/*',
      ]);
    }

    if(answers.includeSources.indexOf('vendor') == -1) {
      globalSource = globalSource.concat([
        '!src/vendor/**/*',
        '!src/packages/**/*',
        '!manifest.json',
        '!bower.json'
      ]);
    } else {
      globalSource = globalSource.concat([
        'src/vendor/**/*',
        'src/packages/**/*',
        'manifest.json',
        'bower.json'
      ]);
    }

    if(answers.includeSources.indexOf('fonts') == -1) {
      globalSource = globalSource.concat([
        '!src/fonts/**/*',
      ]);
    } else {
      globalSource = globalSource.concat([
        'src/fonts/**/*',
      ]);
    }

    glob(globalSource, {
      cwd: globalPath
    }).then(function(filePaths){
      filePaths.forEach(function(filePath){
        fse.copySync(path.join(globalPath, filePath), path.join(destPath, filePath));
      });


      /**
       * Layout
       */
      var patterns = [
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        'assets/css/**/*',
        'assets/js/**/*',
        'assets/images/**/*'
      ];

      if(answers.includeSource) {
        patterns = patterns.concat([
          '.csscomb.json',
          '.csslintrc',
          '.jshintrc',
          'bower.json',
          'color.yml',
        ]);
      }

      if(answers.includeExamples) {
        patterns = patterns.concat([
          'assets/examples/css/**/*',
          'assets/examples/images/**/*',
          //'assets/data/**/*',
        ]);
      } else {
        patterns = patterns.concat([
          '!html/**/*',
          '!assets/examples/css/**/*',
          '!assets/examples/images/**/*',
          '!assets/data/**/*',
        ]);
      }

      if(answers.includeSkins) {
        patterns = patterns.concat([
          'assets/skins/**/*',
        ]);
      } else {
        patterns = patterns.concat([
          '!assets/skins/**/*',
        ]);
      }

      if(answers.includeSource) {
        if(answers.includeSources.indexOf('js') == -1) {
          patterns = patterns.concat([
            '!src/js/**/*',
            '!src/es/**/*',
          ]);
        } else {
          patterns = patterns.concat([
            'src/js/**/*',
            'src/es/**/*',
          ]);
        }

        if(answers.includeSources.indexOf('css') == -1) {
          patterns = patterns.concat([
            '!src/scss/**/*',
          ]);
        } else {
          patterns = patterns.concat([
            'src/scss/**/*',
          ]);
        }

        if(answers.includeSources.indexOf('images') == -1) {
          patterns = patterns.concat([
            '!src/images/**/*',
          ]);
        } else {
          patterns = patterns.concat([
            'src/images/**/*',
          ]);
        }

        if(answers.includeSources.indexOf('skins') == -1) {
          patterns = patterns.concat([
            '!src/skins/**/*',
          ]);
        } else {
          patterns = patterns.concat([
            'src/skins/**/*',
          ]);
        }

        if(answers.includeSources.indexOf('html') == -1) {
          patterns = patterns.concat([
            '!src/templates/**/*',
          ]);
        } else {
          // patterns = patterns.concat([
          //   'src/templates/**/*',
          // ]);
        }

        if(answers.includeSources.indexOf('examples') == -1) {
          patterns = patterns.concat([
            '!src/examples/scss/**/*',
            '!src/templates/pages/*/*',
          ]);
        } else {
          patterns = patterns.concat([
            'src/examples/scss/**/*',
            'src/examples/es/**/*',
            'src/examples/js/**/*'
            //'src/templates/pages/*/*',
          ]);
        }
      }

      glob(patterns, {
        cwd: sourcePath
      }).then(function(files){
        files.forEach(function(file){
          var filePath = path.join(sourcePath, file);
          if(!fse.lstatSync(filePath).isDirectory()){
            fse.copySync(filePath, path.join(destPath, file));
          }
        });
      });
    });
  }



  var replaceCopy = function(file, applause) {
    var filePath = path.join(sourcePath, file);

    if(!fse.lstatSync(filePath).isDirectory()){
      var content = fse.readFileSync(filePath, 'utf8');
      var result = applause.replace(content).content;

      if (result === false ){
        result = content;
      }

      fse.outputFileSync(path.join(destPath, file), result);
    }
  }

  var replace_patterns = ['html/**/*'];

  if(answers.includeExamples) {
    replace_patterns = replace_patterns.concat([
      'assets/data/**/*',
      'assets/examples/js/**/*',
    ]);
  }

  if(answers.includeSource) {
    if(answers.includeSources.indexOf('examples') == -1) {
      replace_patterns = replace_patterns.concat([
        'src/examples/es/**/*',
        'src/examples/js/**/*',
      ]);
    }
  }

  var applause = Applause.create({
    patterns: [
      {
        match: '../global/css',
        replacement: 'assets/css'
      },
      {
        match: '../global/fonts',
        replacement: 'assets/fonts'
      },
      {
        match: '../global/photos',
        replacement: 'assets/photos'
      },
      {
        match: '../global/js',
        replacement: 'assets/js'
      },
      {
        match: '../global/portraits',
        replacement: 'assets/portraits'
      },
      {
        match: '../global/vendor',
        replacement: 'assets/vendor'
      }
    ],
    usePrefix: false
  });

  glob(replace_patterns, {
    cwd: sourcePath
  }).then(function(files){
    files.forEach(function(file){
      replaceCopy(file, applause);
    });
  });

  if(answers.includeSource) {
    var applause_src = Applause.create({
      patterns: [
        {
          match: '{{global}}',
          replacement: '{{assets}}'
        }
      ],
      usePrefix: false
    });

    var template_patterns = [];

    if(answers.includeSources.indexOf('html') == -1) {
      template_patterns = template_patterns.concat([
        '!src/templates/**/*',
      ]);
    } else {
      template_patterns = template_patterns.concat([
        'src/templates/**/*',
      ]);
    }

    if(answers.includeSources.indexOf('examples') == -1) {
      template_patterns = template_patterns.concat([
        '!src/templates/pages/*/*',
      ]);
    } else {
      template_patterns = template_patterns.concat([
        'src/templates/pages/*/*',
      ]);
    }

    glob(template_patterns, {
      cwd: sourcePath
    }).then(function(files){
      files.forEach(function(file){
        replaceCopy(file, applause_src);
      });
    });
  }

  if(answers.buildSystem === true) {
    var buildSource = '.src';
    var context = {};

    if(answers.includeSources.indexOf('js') !== -1) {
      context.processJs = true;
    }

    if(answers.includeSources.indexOf('css') !== -1) {
      context.processCss = true;
    }

    if(answers.includeSources.indexOf('skins') !== -1) {
      context.processSkins = true;
    }

    if(answers.includeSources.indexOf('html') !== -1) {
      context.processHtml = true;
    }

    if(answers.includeSources.indexOf('examples') !== -1) {
      context.processExamples = true;
    }

    if(answers.includeSources.indexOf('vendor') !== -1) {
      context.processVendor = true;
    }

    if(answers.includeSources.indexOf('fonts') !== -1) {
      context.processFonts = true;
    }

    if(answers.includeSources.indexOf('images') !== -1) {
      context.processImages = true;
    }

    var preprocessCopy = function(srcFile, destFile, options){
      if(typeof destFile === 'object') {
        options = destFile;
        destFile = srcFile;
      }
      if(typeof destFile === 'undefined') {
        destFile = srcFile;
      }

      return fse.copyAsync(path.join(buildSource, srcFile), path.join(destPath, destFile)).then(function(){
        pp.preprocessFileSync(path.join(destPath, destFile), path.join(destPath, destFile), context, options);
      });
    }

    var justCopy = function(srcFile, destFile) {
      if(typeof destFile === 'undefined') {
        destFile = srcFile;
      }
      return fse.copy(path.join(buildSource, srcFile), path.join(destPath, destFile));
    }

    if(answers.buildSystem){
      preprocessCopy('package.json', 'package.json', {type: 'js'});
      preprocessCopy('gulpfile.babel.js');
      justCopy(path.join('tasks', 'utils'));
      justCopy(path.join('tasks', 'clean.js'));
      justCopy(path.join('tasks', 'browser.js'));
      justCopy(path.join('tasks', 'server.js'));
      justCopy(path.join('tasks', 'version.js'));
      preprocessCopy(path.join('tasks', 'watch.js'));
      justCopy('postcss.config.js');

      if(context.processHtml) {
        justCopy(path.join('tasks', 'html.js'));
        justCopy(path.join('tasks', 'usemin.js'));
        justCopy('.htmlhintrc');
      }

      if(context.processExamples) {
        justCopy(path.join('tasks', 'examples'));
        justCopy(path.join('tasks', 'examples.js'));
      }

      if(context.processSkins) {
        justCopy(path.join('tasks', 'skins.js'));
      }

      if(context.processFonts) {
        justCopy(path.join('tasks', 'fonts.js'));
      }

      if(context.processImages) {
        justCopy(path.join('tasks', 'images.js'));
      }

      if(context.processVendor) {
        justCopy(path.join('tasks', 'vendor.js'));
      }

      if(context.processJs) {
        justCopy(path.join('tasks', 'scripts.js'));
        justCopy('.babelrc');
        justCopy('.eslintrc.json');
      }

      if(context.processCss) {
        justCopy(path.join('tasks', 'styles.js'));
        justCopy('.stylelintrc');
      }

      if(context.processJs & context.processCss) {
        justCopy(path.join('tasks', 'beautify.js'));
      }

      if(answers.includeWebpack) {
        justCopy(path.join('tasks', 'webpack.js'));
      }
    }

    if(answers.includeWebpack) {
      justCopy('webpack');
    }

    justCopy('config.js');
  }

  console.log('Success');
});

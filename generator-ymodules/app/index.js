var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.option('flow', {
          type: Boolean,
          defaults: false,
          desc: 'Flow syntax support'
        });

        this.option('es6', {
          type: Boolean,
          defaults: false,
          desc: 'ES6 syntax support via babel'
        });

        this.appname = 'ymodule';
    },

    prompting: function () {
        var done = this.async(),
            questions = [
                {
                    input: 'input',
                    name: 'appname',
                    message: 'Your project name',
                    default: this.appname
                },
                {
                    input: 'input',
                    name: 'username',
                    message: 'Your name',
                    default: ''
                }
            ];

        this.prompt(questions, function (answers) {
            this.userData = answers;
            done();
        }.bind(this));
    },

    writing: {
      packageJSON: function () {
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          {
            appname: this.userData.appname,
            username: this.userData.username,
            flow: this.options['flow'],
            es6: this.options['es6']
          }
        );
      },
      babel: function () {
        if (!this.options['flow'] && !this.options['es6']) {
          return;
        }
        this.fs.copyTpl(
          this.templatePath('babelrc'),
          this.destinationPath('.babelrc'),
          {
            flow: this.options['flow'],
            es6: this.options['es6']
          }
        );
      },
      build: function () {
        this.fs.copyTpl(
          this.templatePath('build.json'),
          this.destinationPath('build.json'),
          {
            flow: this.options['flow'],
            es6: this.options['es6']
          }
        );
      },
      flow: function () {
        if (!this.options['flow']) {
          return;
        }
        this.fs.copy(this.templatePath('flowconfig'), this.destinationPath('.flowconfig'));
      },
      copy: function () {
        this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
        this.fs.copy(this.templatePath('eslintrc'), this.destinationPath('.eslintrc'));
        this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
      }
    },

    install: function () {
      this.installDependencies();
    },

    end: function () {
      this.log('Buy!');
    }
});

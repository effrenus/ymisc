var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

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
          {appname: this.userData.appname, username: this.userData.username}
        );
      },
      copy: function () {
        this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
        this.fs.copy(this.templatePath('eslintrc'), this.destinationPath('.eslintrc'));
        this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'));
        this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('build.json'), this.destinationPath('build.json'));
        this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.json'));
      }
    },

    install: function () {
      this.installDependencies();
    },

    end: function () {
      this.log('Buy!');
    }
});

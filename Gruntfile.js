module.exports = function(grunt)
{
    require('load-grunt-tasks')(grunt);

    grunt.initConfig(
        {
            eslint:
            {
                options: {},
                target: ['.'],  // Use directories instead of wildcards (like *.js) or you will get a warning for every ignored file!
            },
        });

    grunt.registerTask('lint', ['eslint']);

    grunt.registerTask('default', ['lint']);
};

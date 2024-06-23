document.getElementById('confettiButton').addEventListener('click', function() {
    const confettiSettings = { target: 'confettiCanvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
});

// Confetti generator code
(function() {
    function ConfettiGenerator(params) {
        // confetti settings
        var confetti = {};
        var settings = params || {};
        settings.target = settings.target || 'confetti-holder';
        settings.max = settings.max || 80;
        settings.size = settings.size || 1;
        settings.animate = settings.animate !== undefined ? settings.animate : true;
        settings.respawn = settings.respawn !== undefined ? settings.respawn : true;
        settings.clock = settings.clock || 25;
        settings.interval = settings.interval || null;
        settings.color = settings.color || [0, 0, 0];
        settings.color = typeof settings.color === 'object' ? settings.color : [settings.color];
        settings.rotate = settings.rotate !== undefined ? settings.rotate : true;
        settings.start_from_edge = settings.start_from_edge !== undefined ? settings.start_from_edge : false;
        settings.respawn_confetti = settings.respawn_confetti !== undefined ? settings.respawn_confetti : true;
        settings.orig_rotate = settings.orig_rotate !== undefined ? settings.orig_rotate : true;
        var canvas = document.getElementById(settings.target);
        var ctx = canvas.getContext('2d');
        var particles = [];

        function randomFromTo(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        function ConfettiParticle() {
            this.x = Math.random() * canvas.width;
            this.y = (settings.start_from_edge) ? (Math.random() * canvas.height) - canvas.height : Math.random() * canvas.height;
            this.r = randomFromTo(5, 30);
            this.d = (Math.random() * settings.max) + 1;
            this.color = settings.color[Math.floor(Math.random() * settings.color.length)];
            this.tilt = Math.random() * 10 - 10;
            this.tiltAngleIncremental = (Math.random() * 0.07) + 0.05;
            this.tiltAngle = 0;

            this.draw = function() {
                ctx.beginPath();
                ctx.lineWidth = this.r / 2;
                ctx.strokeStyle = this.color;
                ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
                ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
                return ctx.stroke();
            }
        }

        function Draw() {
            var results;
            requestAnimationFrame(Draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            results = [];
            for (var i = 0; i < settings.max; i++) {
                results.push(particles[i].draw());
            }
            var particle = {};
            for (var i = 0; i < settings.max; i++) {
                particle = particles[i];
                particle.tiltAngle += particle.tiltAngleIncremental;
                particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / settings.clock;
                particle.tilt = Math.sin(particle.tiltAngle - (i / 3)) * 15;

                if (particle.y <= canvas.height) continue;
                if (settings.respawn_confetti) particles[i] = new ConfettiParticle();
            }
            return results;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, true);
        (function() {
            for (var i = 0; i < settings.max; i++) {
                particles.push(new ConfettiParticle());
            }
            Draw();
        })();
    }
    window.ConfettiGenerator = ConfettiGenerator;
})();
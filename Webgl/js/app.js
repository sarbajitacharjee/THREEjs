const canvas = document.getElementById('webgl-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL not supported');
    return;
}

// Initialize shaders (from shaders.js)
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// Create the program and use it
const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

// Setup geometry (e.g., a triangle)
const vertices = new Float32Array([
    0.0,  0.5,  // Vertex 1
   -0.5, -0.5,  // Vertex 2
    0.5, -0.5   // Vertex 3
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_Position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Set the viewport and clear the canvas
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Black background
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Creates a simple uncompressed GLB file containing a basic cube
 * GLB format: 12-byte header + JSON chunk + Binary chunk
 */

function createTestGLB() {
    // Cube vertex positions (8 vertices)
    const positions = new Float32Array([
        -1.0, -1.0,  1.0,  // 0
         1.0, -1.0,  1.0,  // 1
         1.0,  1.0,  1.0,  // 2
        -1.0,  1.0,  1.0,  // 3
        -1.0, -1.0, -1.0,  // 4
         1.0, -1.0, -1.0,  // 5
         1.0,  1.0, -1.0,  // 6
        -1.0,  1.0, -1.0   // 7
    ]);

    // Cube normals (6 face normals, repeated for each vertex)
    const normals = new Float32Array([
         0.0,  0.0,  1.0,  // Front face
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0, -1.0,  // Back face
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0
    ]);

    // Cube indices (12 triangles, 36 indices)
    const indices = new Uint16Array([
        // Front face
        0, 1, 2,  2, 3, 0,
        // Back face
        4, 5, 6,  6, 7, 4,
        // Top face
        3, 2, 6,  6, 7, 3,
        // Bottom face
        0, 1, 5,  5, 4, 0,
        // Right face
        1, 5, 6,  6, 2, 1,
        // Left face
        4, 0, 3,  3, 7, 4
    ]);

    // Calculate buffer sizes
    const positionsSize = positions.byteLength;
    const normalsSize = normals.byteLength;
    const indicesSize = indices.byteLength;
    const totalBinarySize = positionsSize + normalsSize + indicesSize;

    // Create glTF JSON
    const gltfJson = {
        asset: {
            generator: "Manual GLB Creator - Test Cube",
            version: "2.0"
        },
        scene: 0,
        scenes: [{
            name: "Test Scene",
            nodes: [0]
        }],
        nodes: [{
            name: "Test Cube",
            mesh: 0
        }],
        meshes: [{
            name: "Cube Mesh",
            primitives: [{
                attributes: {
                    POSITION: 0,
                    NORMAL: 1
                },
                indices: 2
            }]
        }],
        accessors: [
            // Position accessor
            {
                bufferView: 0,
                componentType: 5126, // FLOAT
                count: 8,
                max: [1.0, 1.0, 1.0],
                min: [-1.0, -1.0, -1.0],
                type: "VEC3"
            },
            // Normal accessor
            {
                bufferView: 1,
                componentType: 5126, // FLOAT
                count: 8,
                type: "VEC3"
            },
            // Indices accessor
            {
                bufferView: 2,
                componentType: 5123, // UNSIGNED_SHORT
                count: 36,
                type: "SCALAR"
            }
        ],
        bufferViews: [
            // Position buffer view
            {
                buffer: 0,
                byteOffset: 0,
                byteLength: positionsSize,
                target: 34962 // ARRAY_BUFFER
            },
            // Normal buffer view
            {
                buffer: 0,
                byteOffset: positionsSize,
                byteLength: normalsSize,
                target: 34962 // ARRAY_BUFFER
            },
            // Indices buffer view
            {
                buffer: 0,
                byteOffset: positionsSize + normalsSize,
                byteLength: indicesSize,
                target: 34963 // ELEMENT_ARRAY_BUFFER
            }
        ],
        buffers: [{
            byteLength: totalBinarySize
        }]
    };

    // Convert JSON to buffer
    const jsonString = JSON.stringify(gltfJson);
    const jsonBuffer = Buffer.from(jsonString, 'utf8');
    
    // Ensure JSON chunk is padded to 4-byte boundary
    const jsonPadding = (4 - (jsonBuffer.length % 4)) % 4;
    const paddedJsonBuffer = Buffer.concat([
        jsonBuffer,
        Buffer.alloc(jsonPadding, 0x20) // Pad with spaces
    ]);

    // Create binary buffer
    const binaryBuffer = Buffer.concat([
        Buffer.from(positions.buffer),
        Buffer.from(normals.buffer),
        Buffer.from(indices.buffer)
    ]);

    // Ensure binary chunk is padded to 4-byte boundary
    const binaryPadding = (4 - (binaryBuffer.length % 4)) % 4;
    const paddedBinaryBuffer = Buffer.concat([
        binaryBuffer,
        Buffer.alloc(binaryPadding, 0x00) // Pad with zeros
    ]);

    // Create GLB header
    const header = Buffer.alloc(12);
    header.writeUInt32LE(0x46546C67, 0);  // "glTF" magic number
    header.writeUInt32LE(2, 4);           // Version
    header.writeUInt32LE(
        12 + 8 + paddedJsonBuffer.length + 8 + paddedBinaryBuffer.length, 
        8
    ); // Total file length

    // Create JSON chunk header
    const jsonChunkHeader = Buffer.alloc(8);
    jsonChunkHeader.writeUInt32LE(paddedJsonBuffer.length, 0);
    jsonChunkHeader.writeUInt32LE(0x4E4F534A, 4); // "JSON" chunk type

    // Create binary chunk header
    const binaryChunkHeader = Buffer.alloc(8);
    binaryChunkHeader.writeUInt32LE(paddedBinaryBuffer.length, 0);
    binaryChunkHeader.writeUInt32LE(0x004E4942, 4); // "BIN\0" chunk type

    // Combine all parts
    const glbBuffer = Buffer.concat([
        header,
        jsonChunkHeader,
        paddedJsonBuffer,
        binaryChunkHeader,
        paddedBinaryBuffer
    ]);

    // Write to file
    const outputPath = path.join(__dirname, '..', 'models', 'test.glb');
    fs.writeFileSync(outputPath, glbBuffer);

    console.log(`✅ Created test.glb at ${outputPath}`);
    console.log(`📊 File size: ${glbBuffer.length} bytes`);
    console.log(`📋 Contains: 8 vertices, 36 indices (12 triangles)`);
    console.log(`🔧 Format: Uncompressed GLB 2.0`);
    
    return outputPath;
}

// Run if called directly
if (require.main === module) {
    try {
        createTestGLB();
    } catch (error) {
        console.error('❌ Error creating GLB file:', error.message);
        process.exit(1);
    }
}

module.exports = { createTestGLB };
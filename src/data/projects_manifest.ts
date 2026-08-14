import { Project } from '../types';

export interface ProjectsManifestConfig {
  title: string;
  totalProjectsCount: number;
  items: Project[];
}

export const PROJECTS_MANIFEST: ProjectsManifestConfig = {
  title: 'ARCHITECTURE & LABS SHOWCASE',
  totalProjectsCount: 4,
  items: [
    {
      id: 'warpkv',
      name: 'WarpKV',
      subtitle: 'GPU-Accelerated Distributed Key-Value Store',
      tagline: 'Raft-based distributed database with CUDA parallel lookup acceleration and zero-copy PCIe DMA transport.',
      category: 'Distributed Systems & GPU',
      primaryLanguage: 'C++ / CUDA',
      status: 'ACTIVE',
      description: 'WarpKV achieves extreme-throughput Key-Value operations by fully offloading hash table lookups and insertions to the GPU via CUDA parallel kernels and PCIe DMA streams.',
      blueprintImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      metrics: {
        memory: '14.2 GB',
        latency: '0.18 ms',
        throughput: '96.85M Keys/s',
      },
      techTags: ['C++', 'CUDA 11+', 'Warp Cuckoo Hashing', 'PCIe DMA', 'xxhash3', 'pybind11', 'GTest'],
      globalView: {
        overviewParagraph: 'WarpKV solves the problem of achieving extreme-throughput Key-Value operations by fully offloading hash table lookups and insertions to the GPU. The system achieves millions of operations per second using a low-level pipeline architecture that overlaps asynchronous PCIe memory transfers with the execution of Warp-Cooperative Cuckoo Hashing and vectorized, sub-nanosecond GPU hashing kernels.',
        problemStatement: 'Traditional CPU key-value stores bottleneck on cache line lock contention and DRAM memory bandwidth limits under high-concurrency read/write workloads.',
        architecturalSolution: 'Decouples CPU control loops by offloading lock-free Warp-Cooperative Cuckoo Hashing directly onto 384+ CUDA cores using double-buffered PCIe DMA streams and L2 cache-aligned 128-byte memory buckets.',
        benchmarksWorkload: 'YCSB Workload C (4 Million Buckets, 10 Million Keys, RTX 4090 baseline)',
        benchmarksList: [
          { label: 'Lookup Throughput', value: '96.85M keys/sec', subtext: 'Cache-hit optimized parallel GPU lookup', highlight: true },
          { label: 'Insert Throughput', value: '75.06M keys/sec', subtext: 'Warp-cooperative lock-free eviction chain', highlight: true },
          { label: 'Reliability & Backpressure', value: '0 Mismatches', subtext: 'Sustained up to 45% load factor; auto-rehash triggers at 50% capacity' },
          { label: 'Average Read Latency', value: '0.18 ms', subtext: 'End-to-end PCIe DMA + Kernel completion' },
          { label: 'Peak Device Memory', value: '14.2 GB VRAM', subtext: 'L2 cache line (128B) aligned bucket layouts' },
          { label: 'Maximum Cuckoo Hops', value: '128 Hops', subtext: 'Overflows to lock-free Emergency Stash Queue' }
        ],
        deploymentStack: {
          coreSystems: [
            'C++',
            'CUDA Toolkit 11+'
          ],
          buildValidation: [
            'CMake 3.18+',
            'Google Test (GTest)'
          ],
          libraries: [
            'pybind11 for zero-copy machine learning interop',
            'Custom GPU-optimized xxhash3 & Murmur3 finalizers'
          ],
          repoUrl: 'https://github.com/RitwikGupta-0501/cuda-kv-store'
        }
      },
      layers: [
        {
          id: 'layer-engine-pipeline',
          name: 'Engine Pipeline & Concurrency Layer',
          subtitle: 'Epoch-Based Reclamation & 3-Stage Stream Buffering',
          category: 'Ingress',
          color: '#00E5FF',
          description: 'Manages the asynchronous orchestration of data between the host CPU and GPU device, tracking active table epochs and executing batched workloads.',
          architectureRationale: 'The engine is built around an Epoch-Based Reclamation (EBR) strategy combined with a 3-stage stream buffering architecture (concurrent H->D, Kernel, and D->H via cudaStream_t). By leveraging cudaGraphLaunch and cudaEvent_t, it achieves lock-free pipelining that entirely masks PCIe bus transfer latency, allowing for wait-free background table swaps (rehashing) without halting active read queries.',
          techStack: ['CUDA Streams', 'cudaGraphLaunch', 'Epoch-Based Reclamation (EBR)', 'C++17', 'cudaEvent_t'],
          latency: '0.04 ms',
          throughput: '96.85M Keys/s',
          memoryFootprint: '512 MB Ring',
          protocols: ['CUDA Async Stream API', 'PCIe DMA'],
          metrics: [
            { label: 'Concurrent Streams', value: '3 (H2D, Kernel, D2H)' },
            { label: 'EBR Epoch Delay', value: '0.00 ms' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'engine_pipeline.cc',
            code: `// 3-Stage CUDA Stream Buffering & Graph Launch Pipeline
void WarpEngine::EnqueueBatchAsync(const KeyBatch& batch) {
    uint32_t stream_idx = active_epoch_.load(std::memory_order_relaxed) % kNumStreams;
    cudaStream_t stream = streams_[stream_idx];

    // Stage 1: Async Host to Device DMA
    cudaMemcpyAsync(d_input_keys_[stream_idx], batch.keys.data(), 
                    batch.size_bytes(), cudaMemcpyHostToDevice, stream);

    // Stage 2: Execute Graph Kernel
    cudaGraphLaunch(graph_exec_[stream_idx], stream);

    // Stage 3: Async Device to Host DMA
    cudaMemcpyAsync(batch.results.data(), d_output_vals_[stream_idx], 
                    batch.size_bytes(), cudaMemcpyDeviceToHost, stream);
}`
          }
        },
        {
          id: 'layer-cuckoo-execution',
          name: 'Cuckoo Execution & Hash Table Layer',
          subtitle: 'Warp-Cooperative Lock-Free Eviction Chains',
          category: 'Kernel',
          color: '#3B82F6',
          description: 'The core device environment where individual key-value pairs are hashed, evaluated, inserted, or evicted from the GPU memory arrays.',
          architectureRationale: 'Employs Warp-Cooperative Execution to eliminate thread divergence. Using __ballot_sync and __shfl_sync intrinsics, a single 32-thread warp evaluates two distinct hash buckets in parallel. Insertions utilize atomicCAS on a reserved LOCK_SENTINEL (0xFFFFFFFFu) to claim slots, forming a strictly lock-free multi-hop eviction chain capable of resolving up to 128 eviction hops without halting the warp.',
          techStack: ['Warp Intrinsics', 'atomicCAS', 'Cuckoo Hashing', 'CUDA Cores', 'PTX Intrinsics'],
          latency: '0.02 ms',
          throughput: '75.06M Inserts/s',
          memoryFootprint: '8.0 GB VRAM',
          protocols: ['PTX Assembly / CUDA 12'],
          metrics: [
            { label: 'Threads per Warp', value: '32 Co-Op Threads' },
            { label: 'Max Cuckoo Hops', value: '128 Hops' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'cuckoo_kernel.cu',
            code: `// Warp-Cooperative Parallel Bucket Evaluation Kernel
__global__ void WarpCuckooLookupKernel(const uint32_t* __restrict__ keys,
                                       uint32_t* __restrict__ values,
                                       const Bucket* __restrict__ table,
                                       size_t total_keys) {
    uint32_t warp_id = (blockIdx.x * blockDim.x + threadIdx.x) / 32;
    uint32_t lane_id = threadIdx.x & 31;
    if (warp_id >= total_keys) return;

    uint32_t target_key = keys[warp_id];
    uint32_t b1 = Hash1(target_key) & MASK;
    
    // Warp-cooperative parallel compare across 32 lanes
    bool match = (table[b1].slots[lane_id].key == target_key);
    uint32_t mask = __ballot_sync(0xFFFFFFFF, match);

    if (mask != 0) {
        int leader = __ffs(mask) - 1;
        if (lane_id == leader) {
            values[warp_id] = table[b1].slots[leader].value;
        }
    }
}`
          }
        },
        {
          id: 'layer-memory-coalescing',
          name: 'Memory Coalescing & Bucket Layer',
          subtitle: '128-Byte L2 Cache Line Aligned Hybrid Layout',
          category: 'Storage',
          color: '#10B981',
          description: 'Defines the strict physical layout of the hash table memory, structuring how keys, values, and fingerprints are packed into contiguous blocks.',
          architectureRationale: 'Memory is structured using a hybrid Bucket Array-of-Structs (AoS) / Struct-of-Arrays (SoA) layout that is strictly padded to 128 bytes. This exact alignment perfectly matches an L2 cache line. When a warp reads a bucket, the hardware coalesces the operation into a single, perfectly aligned global memory transaction, drastically reducing memory latency and maximizing bus bandwidth.',
          techStack: ['128-Byte Alignment', 'AoS/SoA Hybrid', 'L2 Cache Coalescing', 'PCIe Gen4'],
          latency: '0.01 ms',
          throughput: '128 GB/s Bus',
          memoryFootprint: '4.2 GB VRAM',
          protocols: ['VRAM Coalesced Memory'],
          metrics: [
            { label: 'Bucket Alignment', value: '128 Bytes' },
            { label: 'L2 Transaction Count', value: '1 Per Warp Read' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'bucket_layout.h',
            code: `// Strictly 128-Byte L2 Cache Line Aligned Bucket Layout
struct alignas(128) Bucket {
    uint32_t keys[8];         // 32 bytes
    uint32_t values[8];       // 32 bytes
    uint8_t  fingerprints[8]; // 8 bytes
    uint8_t  occupied_mask;   // 1 byte
    uint8_t  pad[55];         // Pad to exactly 128 bytes
};
static_assert(sizeof(Bucket) == 128, "Bucket MUST be exactly 128 bytes!");`
          }
        },
        {
          id: 'layer-fast-hashing',
          name: 'Fast Hashing Layer',
          subtitle: 'Vectorized XXHash3 & Murmur3 8-bit Fingerprinting',
          category: 'Compute',
          color: '#F59E0B',
          description: 'Translates incoming 32-bit keys into deterministically uniform integer hashes and 8-bit secondary fingerprints used for rapid bucketing.',
          architectureRationale: 'Integrates a heavily vectorized implementation of XXHash3 alongside a custom Murmur3-derived finalizer directly in device code. This design yields sub-nanosecond execution speeds, allowing the 8-bit fingerprint to act as an ultra-fast, first-pass filter during lookups—bypassing costly 32-bit key comparisons unless the fingerprint mask strictly matches.',
          techStack: ['XXHash3 Vectorized', 'Murmur3 Finalizer', '8-bit Fingerprint Filter', 'AVX-512'],
          latency: '< 0.001 ms',
          throughput: '110M Hashes/s',
          memoryFootprint: '128 MB L1/Shared',
          protocols: ['GPU Hardware Math Unit'],
          metrics: [
            { label: 'Hash Execution Time', value: '< 0.85 ns' },
            { label: 'Fingerprint Filter Ratio', value: '99.6% Rejected' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'fast_hashing.cu',
            code: `// Device vectorized xxhash3 & 8-bit fingerprint generator
__device__ __forceinline__ void GenerateHashAndFP(uint32_t key, uint32_t& hash_out, uint8_t& fp_out) {
    // Vectorized Murmur3 finalizer mix
    uint32_t h = key ^ 0x9e3779b9u;
    h ^= h >> 16;
    h *= 0x85ebca6bu;
    h ^= h >> 13;
    h *= 0xc2b2ae35u;
    h ^= h >> 16;

    hash_out = h;
    fp_out = static_cast<uint8_t>((h >> 24) | 0x01); // Non-zero 8-bit FP
}`
          }
        },
        {
          id: 'layer-emergency-stash',
          name: 'Emergency Stash Queue Layer',
          subtitle: 'Lock-Free Overflow Array with Auto-Rehash Backpressure',
          category: 'Transport',
          color: '#EC4899',
          description: 'A lock-free, mapped pinned memory buffer (StashQueue) that acts as an emergency overflow for keys that fail to find an empty slot within the maximum allowable cuckoo hops.',
          architectureRationale: 'Built as a fixed-capacity (32,768 slots) linear array, it uses device-side atomic increments on the queue head. When a key exceeds 128 hops, it is pushed here. A warp cooperatively scans this stash during lookup misses, preventing data loss during anomalous hash collision spikes. Importantly, when the stash queue capacity reaches 4,096 entries, it implicitly applies backpressure, immediately signaling the host engine to trigger the background rehash thread.',
          techStack: ['Pinned Host Memory', 'Atomic Stash Queue', 'Backpressure Signal', 'Background Rehash Thread'],
          latency: '0.05 ms',
          throughput: '32,768 Slot Overflow',
          memoryFootprint: '256 MB Pinned',
          protocols: ['Mapped PCIe Ring'],
          metrics: [
            { label: 'Stash Capacity', value: '32,768 Slots' },
            { label: 'Rehash Threshold', value: '4,096 Entries (50% Load)' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'stash_queue.cu',
            code: `// Emergency Lock-Free Stash Insertion & Backpressure Trigger
__device__ void PushToStashQueue(StashQueue* stash, uint32_t key, uint32_t val) {
    uint32_t slot = atomicAdd(&(stash->head), 1);
    if (slot < STASH_CAPACITY) {
        stash->entries[slot] = {key, val};
    }
    
    // Auto-signal backpressure when reaching threshold
    if (slot >= BACKPRESSURE_THRESHOLD) {
        atomicExch(&(stash->needs_rehash_flag), 1);
    }
}`
          }
        }
      ]
    },
    {
      id: 'swarm-cuda',
      name: 'Swarm-CUDA',
      subtitle: 'GPU-Accelerated Swarm Physics Engine',
      tagline: 'Massive parallel boids physics engine leveraging CUDA 1:1 thread mapping, dynamic spatial hashing, and zero-copy OpenGL VBO interop.',
      category: 'GPU Computing & Parallel Systems',
      primaryLanguage: 'C++ / CUDA',
      status: 'PRODUCTION',
      description: 'GPU-accelerated swarm simulation engine processing 100,000+ independent agents at 470 FPS using CUDA dynamic spatial hashing and zero-copy OpenGL interop.',
      blueprintImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      metrics: {
        memory: 'VRAM Interop',
        latency: '3.24 ms',
        throughput: '470 FPS @ 100k',
      },
      techTags: ['C++', 'CUDA 11+', 'OpenGL 3.3', 'NVIDIA Thrust', 'Spatial Hashing', 'Zero-Copy VBO', 'GLM'],
      globalView: {
        overviewParagraph: 'Swarm-CUDA resolves the severe O(N²) computational bottleneck inherent to massive agent-based simulations by migrating physics integration and spatial logic entirely to the GPU. By leveraging a highly parallel architecture with a 1:1 agent-to-thread mapping and a dynamic grid-based spatial hashing algorithm, the engine avoids exhaustive neighbor queries. The system enforces zero-copy graphics rendering by mapping raw CUDA compute pointers directly into OpenGL Vertex Buffer Objects (VBOs), ensuring the CPU merely orchestrates the execution stream without participating in continuous data processing.',
        problemStatement: 'Naive agent-based simulation algorithms demand O(N²) pair comparisons, creating a massive computational bottleneck that halts real-time performance on CPU architectures when scaling past a few thousand agents.',
        architecturalSolution: 'Migrates spatial binning, neighbor discovery, physics integration, and zero-copy VBO graphics interop entirely to CUDA device memory, guaranteeing CPU-free rendering loops at 470 FPS for 100,000+ agents.',
        benchmarksWorkload: 'Real-Time 100,000 Agent Boids Simulation Workload (NVIDIA RTX 4060)',
        benchmarksList: [
          { label: 'Throughput & Scale', value: '470 FPS @ 100k Agents', subtext: 'Tested on RTX 4060; scales to over 200,000 agents in real-time', highlight: true },
          { label: 'Pipeline Execution Profile', value: '3.24 ms @ 50k Agents', subtext: 'Physics integration dominates pipeline due to extreme cell occupancy', highlight: true },
          { label: 'Low-End Hardware Viability', value: '> 60 FPS @ 70k Agents', subtext: 'Maintains real-time thresholds on entry-level mobile discrete GPUs (e.g., MX130)' }
        ],
        deploymentStack: {
          coreSystems: ['C++', 'CUDA Toolkit 11+'],
          buildValidation: ['OpenGL 3.3', 'GLAD', 'GLFW'],
          libraries: ['NVIDIA Thrust (thrust::sort_by_key)', 'GLM Header Math', 'ImGui', 'nlohmann/json'],
          repoUrl: 'https://github.com/RitwikGupta-0501/swarm-cuda'
        }
      },
      layers: [
        {
          id: 'layer-spatial-hashing',
          name: 'Spatial Hashing & Memory Caching Pipeline',
          subtitle: 'Grid Cell Binning & Contiguous Memory Sorting',
          category: 'Storage',
          color: '#00E5FF',
          description: 'This module (spatial_hash.cu) converts continuous floating-point agent coordinates into discrete 2D grid cells, hashes the cell IDs, and assigns them to contiguous memory buckets.',
          architectureRationale: 'The naive Boids algorithm requires N² comparisons, which is lethal for memory bandwidth. By utilizing thrust::sort_by_key to globally sort the entire agent index array by their cell hashes every frame, the architecture guarantees memory contiguity. When a warp of CUDA threads queries neighboring grid cells, it processes cache-aligned, adjacent blocks of global memory, minimizing cache misses and transforming the complexity from O(N²) to a dense O(N · K).',
          techStack: ['CUDA 11+', 'thrust::sort_by_key', 'Spatial Hashing', 'L2 Cache Alignment'],
          latency: '0.45 ms',
          throughput: '100k Agents / Frame',
          memoryFootprint: '12.8 MB VRAM',
          protocols: ['CUDA Thrust Async Sort'],
          metrics: [
            { label: 'Grid Cell Binning', value: 'O(N · K) Complexity' },
            { label: 'Memory Access', value: 'Warp Coalesced' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'spatial_hash.cu',
            code: `// Dynamic Spatial Hashing & Thrust Key Sorting Kernel
__global__ void CalculateCellHashesKernel(const Agent* __restrict__ agents,
                                          uint32_t* __restrict__ cell_hashes,
                                          uint32_t* __restrict__ agent_indices,
                                          int total_agents, GridConfig grid) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= total_agents) return;

    int cellX = static_cast<int>(agents[idx].pos.x / grid.cellSize);
    int cellY = static_cast<int>(agents[idx].pos.y / grid.cellSize);
    uint32_t hash = (cellX * 73856093) ^ (cellY * 19349663);

    cell_hashes[idx] = hash;
    agent_indices[idx] = idx;
}

void SortAgentsBySpatialHash(uint32_t* d_cell_hashes, uint32_t* d_agent_indices, int count) {
    thrust::sort_by_key(thrust::device, d_cell_hashes, d_cell_hashes + count, d_agent_indices);
}`
          }
        },
        {
          id: 'layer-boids-physics',
          name: 'Boids Physics & State Integration Kernel',
          subtitle: '1:1 CUDA Thread Agent Vector Integration',
          category: 'Compute',
          color: '#3B82F6',
          description: 'A monolithic device kernel (kernels.cu, neighbor_query.cuh) where a single CUDA thread calculates the separation, alignment, cohesion, and predictive ray-casted obstacle avoidance for exactly one agent.',
          architectureRationale: 'This layer is engineered to maximize streaming multiprocessor (SM) occupancy. Local neighbor accumulator variables (sepX, aliX, etc.) are passed by pointer into __device__ inline functions to heavily leverage fast on-chip registers and avoid global memory roundtrips. Additionally, branching is aggressively flattened; complex behaviors like "Fear Weights" for predator evasion are mathematically accumulated into the final vector integration step, effectively mitigating warp divergence.',
          techStack: ['CUDA Device Kernels', '__device__ inline', 'Register Accumulation', 'SM Occupancy'],
          latency: '3.24 ms',
          throughput: '470 FPS @ 100k',
          memoryFootprint: '32 MB Registers',
          protocols: ['SIMT Parallel Processing'],
          metrics: [
            { label: 'SM Occupancy', value: '98.5% Max' },
            { label: 'Branching Strategy', value: 'Zero Warp Divergence' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'kernels.cu',
            code: `// 1:1 Agent Thread Physics & Neighbor Query Integration
__global__ void IntegrateBoidsKernel(Agent* __restrict__ agents,
                                     const uint32_t* __restrict__ sorted_indices,
                                     const uint32_t* __restrict__ cell_starts,
                                     int count, float dt) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= count) return;

    Agent self = agents[sorted_indices[idx]];
    float2 forceSep = make_float2(0.0f, 0.0f);
    float2 forceAli = make_float2(0.0f, 0.0f);
    float2 forceCoh = make_float2(0.0f, 0.0f);

    // Fast inline register-pass neighbor accumulator
    AccumulateNeighborForces(self, cell_starts, &forceSep, &forceAli, &forceCoh);

    // Flattened vector integration step
    self.vel.x += (forceSep.x * 1.5f + forceAli.x * 1.0f + forceCoh.x * 1.0f) * dt;
    self.vel.y += (forceSep.y * 1.5f + forceAli.y * 1.0f + forceCoh.y * 1.0f) * dt;
    self.pos.x += self.vel.x * dt;
    self.pos.y += self.vel.y * dt;

    agents[sorted_indices[idx]] = self;
}`
          }
        },
        {
          id: 'layer-zerocopy-interop',
          name: 'Host-Device Memory Orchestration (Zero-Copy Interop)',
          subtitle: 'Hardware-Level CUDA-OpenGL VBO Direct Mapping',
          category: 'Transport',
          color: '#10B981',
          description: 'The bridging layer (interop_cuda_gl.cu, simulation.cu) that bypasses the host memory entirely by binding the CUDA simulation device pointers to an active OpenGL rendering context.',
          architectureRationale: 'Round-tripping 200,000 structs (position, velocity, metadata) over the PCI-e bus at 60Hz would instantly saturate bandwidth and stall the CPU. This layer explicitly invokes cudaGraphicsGLRegisterBuffer and cudaGraphicsMapResources to yield hardware-level zero-copy access. The GPU computes the physics step, mutates the agent state in VRAM, and then OpenGL natively consumes those exact bytes to render the frame—the CPU never touches the position data.',
          techStack: ['cudaGraphicsGLRegisterBuffer', 'cudaGraphicsMapResources', 'Zero-Copy VBO', 'PCIe Bypass'],
          latency: '0.02 ms',
          throughput: 'Zero PCIe Bus Overhead',
          memoryFootprint: 'Shared VRAM Buffer',
          protocols: ['CUDA Graphics Interop API'],
          metrics: [
            { label: 'PCIe Transfer Rate', value: '0 Bytes/sec (Zero-Copy)' },
            { label: 'CPU Occupancy', value: '< 0.5% Load' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'interop_cuda_gl.cu',
            code: `// Hardware-Level CUDA-OpenGL Zero-Copy Buffer Mapping
void ZeroCopyInterop::MapVBOToCUDA(GLuint vbo_id, cudaGraphicsResource** resource) {
    cudaGraphicsGLRegisterBuffer(resource, vbo_id, cudaGraphicsRegisterFlagsWriteDiscard);
}

void ZeroCopyInterop::ExecuteDirectGraphicsUpdate(cudaGraphicsResource* resource, Agent* d_agents, int count) {
    Agent* d_vbo_ptr = nullptr;
    size_t num_bytes = 0;

    cudaGraphicsMapResources(1, &resource, 0);
    cudaGraphicsResourceGetMappedPointer((void**)&d_vbo_ptr, &num_bytes, resource);

    // Direct CUDA device-to-device VBO memory mutation
    cudaMemcpyAsync(d_vbo_ptr, d_agents, count * sizeof(Agent), cudaMemcpyDeviceToDevice);

    cudaGraphicsUnmapResources(1, &resource, 0);
}`
          }
        },
        {
          id: 'layer-instanced-rendering',
          name: 'Instanced Rendering & Shader Topology',
          subtitle: 'glDrawArraysInstanced Hardware Geometry Pipeline',
          category: 'Kernel',
          color: '#F59E0B',
          description: 'The graphical pipeline (renderer.cpp, agent_layout.h) that digests the mapped device memory to generate massive geometry without issuing individual draw calls.',
          architectureRationale: 'Rendering millions of overlapping triangles per second requires extreme mitigation of CPU-side draw calls. This layer utilizes glDrawArraysInstanced operating on a rigidly enforced 16-byte aligned RenderAgent memory layout (position_x, position_y, velocity_x, velocity_y). The vertex shader intercepts the raw velocity vectors to dynamically construct rotation matrices on the fly, calculating headings without needing computationally expensive trigonometric operations on the host.',
          techStack: ['glDrawArraysInstanced', '16-Byte Aligned Struct', 'On-The-Fly Vertex Rotation', 'GLSL Shaders'],
          latency: '0.85 ms',
          throughput: '470 FPS Geometry Render',
          memoryFootprint: '16 Bytes / Agent',
          protocols: ['OpenGL 3.3 Core Profile'],
          metrics: [
            { label: 'Draw Call Count', value: '1 Call Per Frame' },
            { label: 'Vertex Memory Padding', value: 'Strict 16-Byte Alignment' }
          ],
          codeSnippet: {
            language: 'cpp',
            filename: 'renderer.cpp',
            code: `// Instanced Draw Call Dispatch & GLSL Vertex Matrix Construction
void AgentRenderer::DrawInstanced(GLuint vao, int agent_count) {
    glBindVertexArray(vao);
    // Single draw call for 100,000+ independent agents
    glDrawArraysInstanced(GL_TRIANGLES, 0, 3, agent_count);
    glBindVertexArray(0);
}`
          }
        }
      ]
    },
    {
      id: 'hyperorchestrator',
      name: 'HyperOrchestrator',
      subtitle: 'Bare-Metal Container Engine & K8s Operator',
      tagline: 'Lightweight rootless container runtime with eBPF networking telemetry, Cgroups v2 resource slicing, and custom scheduler.',
      category: 'Cloud Infrastructure & Kernel',
      primaryLanguage: 'Rust / Go',
      status: 'ACTIVE',
      description: 'Replaces heavy Docker/containerd stacks with a single-binary Rust container isolation runtime that boots lightweight isolated sandbox micro-containers in under 8ms.',
      blueprintImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      metrics: {
        memory: '24 MB / Container',
        latency: '7.8 ms Boot',
        throughput: '1,200 Pods/Node',
      },
      techTags: ['Rust', 'Go', 'Linux Cgroups v2', 'eBPF', 'OverlayFS', 'Kubernetes CRD'],
      globalView: {
        overviewParagraph: 'HyperOrchestrator provides sub-10ms micro-container sandbox provisioning by issuing direct Linux unshare, pivot_root, and Cgroups v2 syscalls in Rust, eliminating OCI runtime daemon bloat.',
        problemStatement: 'Standard containerd/Docker runtime stacks take 800ms-2.5s to cold start containers and consume 120MB+ daemon RAM per node.',
        architecturalSolution: 'Replaces standard OCI daemons with a single 4MB compiled Rust binary coupled with Go Kubernetes CRD reconciliation and eBPF XDP network filters.',
        benchmarksWorkload: 'Multi-Tenant Micro-Sandbox Cold-Start Test (10,000 Containers)',
        benchmarksList: [
          { label: 'Sandbox Boot Delay', value: '7.8 ms', subtext: 'Sub-10ms cold start micro-containers', highlight: true },
          { label: 'Node Pod Density', value: '1,200 Pods/Node', subtext: 'High-density bare-metal placement', highlight: true },
          { label: 'Memory Footprint', value: '24 MB / Container', subtext: 'Minimal RAM consumption per sandbox' },
          { label: 'Binary Footprint', value: '4.2 MB', subtext: 'Single statically-linked Rust binary' }
        ],
        deploymentStack: {
          coreSystems: ['Rust 1.78+', 'Go 1.22', 'Linux Kernel 5.15+ (Cgroups v2)'],
          buildValidation: ['Cargo Test', 'eBPF Kernel Verifier'],
          libraries: ['nix crate', 'libbpf-rs', 'client-go'],
          repoUrl: 'https://github.com/apex-systems/hyper-orchestrator'
        }
      },
      layers: [
        {
          id: 'layer-crd',
          name: 'Kubernetes CRD Operator & Scheduler',
          subtitle: 'Go-Based Declarative Controller Loop',
          category: 'Ingress',
          color: '#00E5FF',
          description: 'Custom Kubernetes custom resource definition controller watching cluster event streams and calculating optimal NUMA-aware node placement.',
          architectureRationale: 'Ensures pod affinity and hardware isolation without relying on default generic kube-scheduler heuristics.',
          techStack: ['Go 1.22', 'client-go', 'K8s Informer API'],
          latency: '1.2 ms Sync',
          throughput: '500 Events/s',
          memoryFootprint: '64 MB RAM',
          protocols: ['Kubernetes API / HTTP2'],
          metrics: [
            { label: 'Reconciliation Loop', value: '10 ms' },
            { label: 'Scheduling Accuracy', value: '99.8%' },
          ],
          codeSnippet: {
            language: 'go',
            filename: 'operator_controller.go',
            code: `// Declarative K8s reconcile loop for HyperPod CRD
func (r *HyperPodReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	var pod hyperv1.HyperPod
	if err := r.Get(ctx, req.NamespacedName, &pod); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	if pod.Status.Phase == "" {
		pod.Status.Phase = hyperv1.PodPhaseProvisioning
		r.Status().Update(ctx, &pod)
	}
	return r.ScheduleOnBareMetalNode(ctx, &pod)
}`
          }
        },
        {
          id: 'layer-ebpf',
          name: 'eBPF Network & Tracepoint Hooks',
          subtitle: 'XDP Kernel Packet Filter & Security',
          category: 'Security',
          color: '#3B82F6',
          description: 'Kernel-level eBPF bytecode programs attached to XDP (eXpress Data Path) hooks for real-time packet filtering and latency tracing.',
          architectureRationale: 'Observes network traffic and enforces micro-segmentation security rules directly inside the Linux kernel before socket allocation.',
          techStack: ['eBPF / libbpf', 'XDP', 'BCC Tools', 'Rust aya'],
          latency: '0.002 ms',
          throughput: '25.0 Gbps Filter',
          memoryFootprint: '16 MB Ring Buffer',
          protocols: ['Kernel Socket Map / eBPF'],
          metrics: [
            { label: 'Overhead', value: '< 0.01%' },
            { label: 'Filter Rule Capacity', value: '65,536' },
          ],
          codeSnippet: {
            language: 'rust',
            filename: 'ebpf_filter.rs',
            code: `// Rust eBPF XDP Packet Filter Attached to Kernel Interface
#[xdp]
pub fn filter_ingress_packets(ctx: XdpContext) -> u32 {
    match unsafe { try_filter_packets(&ctx) } {
        Ok(action) => action,
        Err(_) => xdp_action::XDP_PASS,
    }
}`
          }
        }
      ]
    },
    {
      id: 'nexusmesh',
      name: 'NexusMesh',
      subtitle: 'WASM-Powered Distributed Microservice Mesh',
      tagline: 'Event-driven serverless service mesh with WebAssembly plugin sandboxes and distributed Raft dynamic routing.',
      category: 'Cloud Native & WASM',
      primaryLanguage: 'Rust / TypeScript',
      status: 'LAB',
      description: 'Combines dynamic edge routing with microsecond WebAssembly plugin execution to evaluate complex access policies and payload transformations on live stream traffic.',
      blueprintImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      metrics: {
        memory: '18 MB / Node',
        latency: '0.45 ms Overhead',
        throughput: '1.5M Req/s Mesh',
      },
      techTags: ['Wasmtime', 'Rust', 'gRPC', 'Envoy Proxy API', 'Gossip Protocol'],
      globalView: {
        overviewParagraph: 'NexusMesh executes custom user middleware transformations safely in sandboxed WebAssembly execution contexts embedded directly inside high-throughput Envoy edge proxies.',
        problemStatement: 'Traditional service mesh sidecars incur significant latency overhead when executing custom lua scripts or remote RPC authorization calls.',
        architecturalSolution: 'Embeds the Wasmtime JIT runtime directly into a compiled Rust edge proxy, achieving sub-100 microsecond memory-isolated plugin execution.',
        benchmarksWorkload: 'Mesh Gateway Middleware Execution (1 Million Requests)',
        benchmarksList: [
          { label: 'Mesh Overhead', value: '0.45 ms', subtext: 'Added latency per proxy hop', highlight: true },
          { label: 'WASM Cold Start', value: '1.8 ms', subtext: 'Sub-2ms WASM module load delay', highlight: true },
          { label: 'Throughput', value: '1.5M Req/s', subtext: 'Parallel mesh request routing' }
        ],
        deploymentStack: {
          coreSystems: ['Rust', 'Wasmtime JIT', 'Envoy Proxy v1.28'],
          buildValidation: ['cargo test', 'wasm32-wasi target'],
          libraries: ['wit-bindgen', 'axum', 'tokio'],
          repoUrl: 'https://github.com/apex-systems/nexus-mesh'
        }
      },
      layers: [
        {
          id: 'layer-gateway',
          name: 'Global Edge Ingress Proxy',
          subtitle: 'Envoy-Compatible Edge Gateway',
          category: 'Ingress',
          color: '#00E5FF',
          description: 'Dynamic edge proxy routing incoming traffic based on header metadata, geo-location, and canary deployment rules.',
          architectureRationale: 'Decouples external SSL/TLS processing and authentication from internal microservice workers.',
          techStack: ['Envoy Proxy API', 'Rust axum', 'JWT Validator'],
          latency: '0.15 ms',
          throughput: '1.5M Req/s',
          memoryFootprint: '128 MB RAM',
          protocols: ['HTTP/3 QUIC', 'gRPC-Web'],
          metrics: [
            { label: 'TLS Handshake', value: '< 1.5 ms' },
            { label: 'Canary Precision', value: '0.1%' },
          ],
          codeSnippet: {
            language: 'rust',
            filename: 'edge_proxy_router.rs',
            code: `// Dynamic edge proxy request dispatcher
pub async fn handle_edge_request(req: Request<Body>) -> Result<Response<Body>, ProxyError> {
    let route = ROUTE_TABLE.read().unwrap().match_route(req.uri().path());
    forward_to_upstream(route.select_endpoint(), req).await
}`
          }
        }
      ]
    }
  ]
};

export const PROJECTS_DATA: Project[] = PROJECTS_MANIFEST.items;

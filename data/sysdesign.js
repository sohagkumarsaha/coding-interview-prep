const SYSDESIGN_PROBLEMS = [
  {
    id: "sd-01",
    title: "Distributed PPO Training for a Fleet of Simulated Humanoids",
    prompt: "Design a system to train a locomotion or manipulation policy with PPO across thousands of parallel simulated environments.",
    clarify: [
      "Single GPU-parallel simulator (Isaac Lab style) or a cluster of CPU environments?",
      "Is this on-policy only, or do we need to support off-policy algorithms later?",
      "What is the target wall-clock time per training iteration?"
    ],
    components: [
      "A GPU-resident, massively parallel physics simulator producing batched rollouts directly on-device, avoiding a CPU-GPU transfer bottleneck.",
      "A rollout worker pool (or a fused simulate-and-infer loop) collecting (state, action, reward, done) tuples into a large on-device buffer.",
      "A learner process that pulls full batches, computes GAE, and performs PPO epochs of minibatch updates, broadcasting weights back to rollout workers.",
      "A metrics/logging pipeline (reward, KL divergence, clip fraction) and periodic checkpointing for fault tolerance."
    ],
    tradeoffs: [
      "On-policy data staleness: the more rollout workers run ahead of the learner, the more off-policy (and less theoretically sound) the PPO update becomes.",
      "GPU-parallel simulation trades simulator fidelity and flexibility for throughput.",
      "Checkpoint frequency versus training throughput: too frequent stalls the pipeline, too infrequent risks losing compute on a crash."
    ]
  },
  {
    id: "sd-02",
    title: "Fleet Data Collection and Prioritization Pipeline",
    prompt: "Design a pipeline that collects trajectory data from a real robot fleet, stores it, and surfaces the highest-value (hardest, rarest, failure) episodes for retraining.",
    clarify: [
      "Is data uploaded in real time or in batches after a robot returns to a base station?",
      "What counts as a failure case: task failure, safety intervention, or both?",
      "What is the expected data volume per robot per day?"
    ],
    components: [
      "Edge-side buffering and compression on the robot, with a lightweight anomaly score flagging candidate-interesting episodes before upload.",
      "A durable object store (partitioned by robot, date, task) with a queryable metadata index (task, outcome, anomaly score).",
      "An offline scoring job re-running a more expensive novelty/failure classifier over newly uploaded data to build a prioritized retraining sample.",
      "A sampling service constructing training batches biased toward rare and failure cases without fully starving common-case data."
    ],
    tradeoffs: [
      "Upload bandwidth and cost versus how much raw sensor data (especially vision) is worth keeping at the edge.",
      "Heuristic edge filtering risks silently dropping the exact rare events you most want; validate the false-negative rate against a held-out full-upload sample.",
      "Privacy and storage retention policy for real-world captured data."
    ]
  },
  {
    id: "sd-03",
    title: "Safe Policy Deployment and Rollback",
    prompt: "Design a system to push an updated policy to a fleet of physical robots safely, with the ability to detect regressions and roll back automatically.",
    clarify: [
      "Is this a full policy swap or an incremental weight update?",
      "What on-robot safety monitoring already exists (watchdogs, fallback controllers)?",
      "What counts as a regression: task success rate, safety interventions, or both?"
    ],
    components: [
      "A canary rollout: the new policy ships to a small percentage of the fleet first, gated by success and intervention rate versus the current production policy.",
      "An on-robot fallback: if onboard confidence or a safety monitor trips a threshold, fall back to the previous known-good policy without a network round trip.",
      "A centralized dashboard aggregating live metrics per policy version, with an automatic halt-and-rollback trigger if the canary falls outside bounds.",
      "Versioned, immutable policy artifacts with fast rollback (swap a version pointer, not a redeploy) to keep mean-time-to-recovery low."
    ],
    tradeoffs: [
      "Canary size versus statistical confidence: too small cannot detect a regression quickly, too large risks broader exposure to a bad policy.",
      "Rollback must not depend on connectivity to a central service, since a fleet robot may need to fail safe while offline.",
      "Rollout speed (getting improvements to the fleet quickly) versus caution (safety-critical, physical hardware)."
    ]
  },
  {
    id: "sd-04",
    title: "Offline RL Training Pipeline From Logged Fleet Data",
    prompt: "Design a pipeline to train an improved policy purely from previously logged fleet trajectories, without further live robot interaction.",
    clarify: [
      "Is the logged data purely from the current policy, or a mixture of several past policy versions?",
      "Do we have reward labels in the logs, or do we need to compute/estimate reward post hoc?",
      "Is downstream deployment gated by offline evaluation, simulated evaluation, or a live canary?"
    ],
    components: [
      "A data curation stage that filters and relabels logged trajectories (reward computation, outcome labeling) before training.",
      "An offline RL algorithm (CQL or IQL style) constraining the learned policy to stay close to the behavior distribution in the logged data.",
      "An offline policy evaluation (OPE) stage estimating the new policy's performance before any live deployment.",
      "A staged rollout (simulation replay, then canary, then fleet) mirroring the deployment pipeline above."
    ],
    tradeoffs: [
      "Distributional shift: the further the learned policy's actions drift from what generated the logged data, the less trustworthy any offline value estimate becomes.",
      "Offline RL cannot discover strategies absent from the logged data; know when to recommend targeted live data collection instead."
    ]
  },
  {
    id: "sd-05",
    title: "Low-Latency Onboard Inference Within a Real-Time Control Loop",
    prompt: "Design the onboard system that runs a trained policy on robot hardware within a strict control-loop deadline (for example, a 100 Hz or 1 kHz cycle).",
    clarify: [
      "What is the actual latency budget, and does it include sensor preprocessing and actuator dispatch, or only the network forward pass?",
      "Is the target hardware GPU, NPU, or CPU-only, and is it shared with other onboard workloads?",
      "What happens if a single control cycle misses its deadline: skip, hold last action, or trigger a safety stop?"
    ],
    components: [
      "A model export/optimization stage (quantization, pruning, operator fusion, conversion to a runtime such as TensorRT or ONNX Runtime) to fit inside the latency budget.",
      "A deterministic real-time scheduling loop for sensor read, inference, and actuator write, isolated from non-real-time processes that must never block the control cycle.",
      "A watchdog detecting a missed deadline or anomalous output and falling back to a safe hold or stop behavior — structurally identical to a fallback controller in a traditional real-time automation system.",
      "Double-buffering of sensor input and action output so inference on the current frame does not block ingestion of the next one."
    ],
    tradeoffs: [
      "Inference latency versus model capacity: a larger, more capable policy is unusable if it cannot meet the control cycle deadline.",
      "Determinism matters as much as average-case speed: a control loop needs a bounded worst-case latency, not just a good average."
    ]
  },
  {
    id: "sd-06",
    title: "Experiment Tracking for Thousands of Concurrent RL Runs",
    prompt: "Design a system to track, compare, and reproduce thousands of concurrent RL training runs across many researchers and hyperparameter sweeps.",
    clarify: [
      "Is reproducibility a hard requirement (bit-exact) or approximate (same config, same broad outcome)?",
      "How large is a typical run's logged artifact set: scalars only, or full checkpoints and rollout videos?",
      "Do sweeps need to be resumable after a cluster preemption?"
    ],
    components: [
      "A run registry capturing the full config (code commit hash, hyperparameters, seed, data version) at launch time.",
      "A metrics store for time-series scalars (reward, loss, KL) with a query and comparison UI across runs and sweeps.",
      "Artifact storage for checkpoints and periodic rollout videos, with an explicit retention policy.",
      "A sweep orchestrator that requeues preempted runs from their last checkpoint rather than restarting from scratch."
    ],
    tradeoffs: [
      "Full reproducibility (pinning every source of randomness) has real engineering and performance cost; decide what's worth paying for versus documenting as known variance.",
      "Storage cost of checkpoints and video at thousands-of-runs scale forces an explicit retention and sampling policy."
    ]
  },
  {
    id: "sd-07",
    title: "URL Shortener",
    prompt: "Design a service like bit.ly: given a long URL, return a short one that redirects to it, at large scale.",
    clarify: [
      "What's the read:write ratio? (Typically read-heavy — far more redirects than new links created.)",
      "Do short codes need to be unguessable/non-sequential, or is predictability acceptable?",
      "Do links expire, and do we need click analytics?"
    ],
    components: [
      "An ID generation strategy: either a counter (base-62 encoded) behind a coordination service, or randomly generated codes with a collision check against the datastore.",
      "A key-value store (long URL keyed by short code) sized for the read-heavy path, fronted by a cache (e.g. Redis) since a small fraction of links get most of the traffic.",
      "A redirect service that does a cache-then-datastore lookup and issues an HTTP 301/302, kept as thin and fast as possible since it's on the hot path for every click.",
      "An asynchronous analytics pipeline (click counts, referrers) that doesn't block the redirect itself."
    ],
    tradeoffs: [
      "301 (permanent, browser-cacheable) versus 302 (temporary) redirects trade off client-side caching speed against the ability to still collect analytics on every click.",
      "Counter-based IDs are simpler and collision-free but reveal creation order and total volume; random codes need a collision check but avoid that leak.",
      "Cache eviction policy matters more than raw cache size here, given the extreme skew toward a small set of popular links."
    ]
  },
  {
    id: "sd-08",
    title: "Rate Limiter",
    prompt: "Design a rate limiter that caps how many requests a client can make in a given time window, usable both as a library and as a shared service across multiple API servers.",
    clarify: [
      "Per-user, per-IP, or per-API-key limiting — or several simultaneously?",
      "Does it need to be exact, or is approximate (eventually consistent) enough at high scale?",
      "Single server or distributed across a fleet needing shared state?"
    ],
    components: [
      "An algorithm choice: token bucket (allows bursts, simple to reason about), sliding window log (exact but memory-heavy), or sliding window counter (a good approximate middle ground).",
      "A fast shared store (Redis, typically) holding each client's counter/bucket state with a TTL, so every API server instance sees consistent limits instead of enforcing its own local counter.",
      "A decision point at the API gateway or as middleware, returning HTTP 429 with a Retry-After header when a client is over budget.",
      "Fail-open versus fail-closed behavior if the rate-limiting store itself becomes unavailable."
    ],
    tradeoffs: [
      "Token bucket is the default choice for most APIs because it tolerates short bursts without being exploitable, unlike a naive fixed window that allows 2x the limit right at a window boundary.",
      "A shared Redis-backed limiter adds a network hop to every request; a local-only limiter avoids that latency but can't enforce a global cap across a multi-server fleet.",
      "Fail-open (allow traffic through) protects availability if the limiter store goes down, but at the cost of temporarily losing protection against abuse."
    ]
  },
  {
    id: "sd-09",
    title: "Twitter-Style News Feed",
    prompt: "Design a system that shows each user a feed of posts from the people they follow, at large scale.",
    clarify: [
      "Read-heavy (feed views) or write-heavy (posts) dominant, and how skewed is the follower graph (celebrities with millions of followers)?",
      "Does the feed need to be real-time, or is a few seconds of staleness acceptable?",
      "Chronological only, or does ranking/relevance matter?"
    ],
    components: [
      "Fan-out-on-write: when a user posts, push the post into the precomputed feed of every follower — fast reads, since a feed view is just a lookup.",
      "Fan-out-on-read: store posts once; assemble a user's feed at request time by merging the latest posts from everyone they follow — avoids the celebrity fan-out explosion.",
      "A hybrid: fan-out-on-write for most users, fan-out-on-read for accounts above a follower-count threshold, merged at feed-view time.",
      "A cache layer for precomputed feeds (fan-out-on-write path) and a separate service for post storage and the social graph."
    ],
    tradeoffs: [
      "Pure fan-out-on-write breaks down for celebrity accounts — one post could mean millions of feed writes; pure fan-out-on-read makes every feed view expensive for average users. The hybrid exists specifically to avoid both failure modes.",
      "Precomputed feeds (fan-out-on-write) trade storage and write cost for very fast, cheap reads — the right tradeoff for a read-heavy product like this."
    ]
  },
  {
    id: "sd-10",
    title: "Real-Time Chat System",
    prompt: "Design a messaging system like WhatsApp: 1:1 and group messaging, delivery guarantees, and online/offline presence, at scale.",
    clarify: [
      "Does it need end-to-end encryption?",
      "Group size limits, and do messages need to persist indefinitely?",
      "Delivery guarantee: at-least-once with client-side dedup, or exactly-once?"
    ],
    components: [
      "Persistent connections (WebSocket, or long-lived TCP) from clients to a fleet of connection/gateway servers, since HTTP request-response doesn't fit server-push messaging.",
      "A connection registry (which server holds which user's live connection) in a fast shared store, so a message from user A can be routed to whichever server user B is connected to.",
      "A message queue and durable message store per conversation, so messages aren't lost if the recipient is offline — delivered on reconnect.",
      "A presence service tracking online/offline/last-seen, updated on connect/disconnect and propagated to relevant contacts."
    ],
    tradeoffs: [
      "At-least-once delivery with a client-generated message ID for dedup is simpler and more robust than trying to guarantee exactly-once across an unreliable network.",
      "Storing the connection-to-server mapping in a fast external store (versus in-memory per-server) is what makes horizontal scaling of the gateway fleet possible at all."
    ]
  },
  {
    id: "sd-11",
    title: "Consistent Hashing for a Distributed Cache",
    prompt: "Design the sharding scheme for a distributed cache (or key-value store) across many nodes, such that adding or removing a node doesn't require remapping most of the keys.",
    clarify: [
      "How frequently do nodes join/leave — is this planned scaling, or does it need to tolerate frequent failures?",
      "Is even load distribution across nodes a hard requirement, or is some skew tolerable?"
    ],
    components: [
      "A hash ring: both nodes and keys are hashed onto the same circular space; a key is owned by the first node found walking clockwise from the key's position.",
      "Virtual nodes: each physical node is placed at many points on the ring rather than one, which smooths out load distribution and reduces the load spike on neighbors when a node fails.",
      "A gossip protocol or a coordination service (like a lightweight Raft group) so every node has a consistent view of ring membership.",
      "Replication to the next N nodes clockwise on the ring for fault tolerance, so losing one node doesn't lose data."
    ],
    tradeoffs: [
      "Without consistent hashing (plain hash(key) % num_nodes), adding or removing a single node remaps nearly every key; consistent hashing bounds the remapping to roughly 1/N of keys.",
      "More virtual nodes per physical node means smoother load distribution but more membership metadata to propagate on every topology change."
    ]
  },
  {
    id: "sd-12",
    title: "Web Crawler",
    prompt: "Design a web crawler that discovers and downloads pages across the internet at scale, while being polite to individual sites.",
    clarify: [
      "Breadth-first discovery, or targeted/topic-focused crawling?",
      "How do we handle robots.txt, crawl-rate politeness per domain, and duplicate content?",
      "Is this a one-time crawl or continuously re-crawling for freshness?"
    ],
    components: [
      "A frontier (URL queue) partitioned by domain, so politeness rate-limiting per domain doesn't require a global lock across the whole crawl.",
      "A fetcher worker pool that downloads pages, respecting robots.txt and per-domain crawl-delay rules.",
      "A dedup layer (a Bloom filter over seen URLs, backed by a real store for the authoritative check) to avoid re-crawling or infinite-looping on already-visited pages.",
      "A parser/link-extractor that feeds newly discovered URLs back into the frontier, plus a separate storage/indexing pipeline for the downloaded content."
    ],
    tradeoffs: [
      "A Bloom filter for the seen-URL check trades a small false-positive rate (occasionally skipping a URL that was never actually crawled) for massive memory savings at web scale.",
      "Domain-partitioned queues are what make per-domain politeness enforceable without a crawl-wide bottleneck, at the cost of more complex frontier management."
    ]
  },
  {
    id: "sd-13",
    title: "Parking Lot (Object-Oriented Design)",
    prompt: "Design the class structure for a multi-level parking lot system: different vehicle and spot sizes, entry/exit, and fee calculation.",
    clarify: [
      "How many vehicle types (motorcycle, car, bus) and do larger vehicles need multiple/larger spots?",
      "Is pricing flat, tiered by duration, or dynamic?",
      "Single lot, or a system managing multiple physical lots?"
    ],
    components: [
      "A ParkingLot class holding a collection of Level objects, each holding a collection of Spot objects, each with a size and occupied/free state.",
      "A Vehicle class hierarchy (Motorcycle, Car, Bus) with a size requirement, so spot-assignment logic can match vehicle to the smallest sufficient spot.",
      "A Ticket object created at entry (timestamp, assigned spot, vehicle) and closed at exit, driving fee calculation from the elapsed duration.",
      "A spot-assignment strategy (nearest-available, or size-optimal) encapsulated separately from the core entities, so the assignment policy can change without touching Vehicle or Spot."
    ],
    tradeoffs: [
      "Modeling vehicle-to-spot compatibility as a size comparison (versus a fixed spot-type-per-vehicle-type mapping) generalizes better if a new vehicle type is added later.",
      "This is fundamentally an OOD interview, not a distributed-systems one — the signal here is clean class boundaries and extensibility, not scale."
    ]
  },
  {
    id: "sd-14",
    title: "Notification System",
    prompt: "Design a system that sends notifications (push, SMS, email) to users triggered by events across a large product, at scale.",
    clarify: [
      "Which channels (push, SMS, email, in-app) and does the user choose preferences per channel?",
      "Are notifications best-effort, or do some need guaranteed delivery (e.g. security alerts)?",
      "What's the expected event volume, and are notifications ever batched/digested rather than sent immediately?"
    ],
    components: [
      "An event ingestion layer (a message queue) decoupling whatever triggers a notification from the sending pipeline, so a spike in events doesn't overwhelm downstream senders.",
      "A notification service that checks user preferences and channel eligibility, then routes to the right channel-specific sender.",
      "Per-channel sender workers (push via APNs/FCM, SMS via a carrier gateway, email via an ESP), each with its own retry and backoff policy, since third-party providers fail independently.",
      "A dedup/rate-limiting layer to avoid notification storms — the same event shouldn't fire the same alert to a user five times in five minutes."
    ],
    tradeoffs: [
      "Queue-based decoupling trades a small amount of latency for the ability to absorb traffic spikes and retry failed sends without losing events.",
      "Per-channel failure isolation (one provider's outage shouldn't block the others) is worth the added complexity of separate worker pools per channel."
    ]
  },
];

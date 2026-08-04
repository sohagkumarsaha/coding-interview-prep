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
  }
];

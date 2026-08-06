// RL implementation problem bank — building blocks tested in ML/robot-learning rounds.
// Note: PyTorch is not available inside the in-browser Pyodide runtime by default,
// so runnable problems here use plain Python / NumPy-style logic where possible.
// Problems that are conceptually PyTorch (marked torch:true) are for study/whiteboard practice
// in Learn and Mock Interview modes; Practice mode runs the NumPy-only ones live.
const RL_PROBLEMS = [
  {
    id: "rl-01",
    title: "Tabular Q-Learning Update",
    pattern: "Value-Based RL",
    torch: false,
    prompt: "Implement the core Q-learning update rule for a discrete state/action space, given a Q-table represented as a dict of dicts.",
    approach: "The Bellman-optimality-based update: move the current Q estimate toward the observed reward plus the discounted max Q of the next state.",
    starter: "def q_learning_update(Q, state, action, reward, next_state, done, alpha, gamma):\n    # your code here\n    pass\n",
    solution: "def q_learning_update(Q, state, action, reward, next_state, done, alpha, gamma):\n    best_next = 0.0 if done else max(Q[next_state].values())\n    td_target = reward + gamma * best_next\n    td_error = td_target - Q[state][action]\n    Q[state][action] += alpha * td_error\n    return Q[state][action]\n",
    complexity: "O(|actions|) time per update, O(|states| * |actions|) space for the table.",
    whyComplexity: "Time is O(|actions|) because computing max(Q[next_state].values()) scans every action once; space is O(|states| * |actions|) for the full Q-table, since every state-action pair gets its own entry.",
    tests: [
      { call: "round(q_learning_update({'s0':{'a0':0.0,'a1':0.0}, 's1':{'a0':1.0,'a1':0.5}}, 's0','a0', 1.0, 's1', False, 0.5, 0.9), 3)", expected: "0.95" }
    ]
  },
  {
    id: "rl-02",
    title: "Epsilon-Greedy Action Selection",
    pattern: "Exploration",
    torch: false,
    prompt: "Implement epsilon-greedy exploration given a list of Q-values for the current state.",
    approach: "With probability epsilon act uniformly at random, otherwise act greedily on the argmax Q-value.",
    starter: "import random\n\ndef epsilon_greedy(q_values, epsilon):\n    # your code here\n    pass\n",
    solution: "import random\n\ndef epsilon_greedy(q_values, epsilon):\n    if random.random() < epsilon:\n        return random.randrange(len(q_values))\n    return max(range(len(q_values)), key=lambda a: q_values[a])\n",
    complexity: "O(|actions|) time, O(1) additional space.",
    whyComplexity: "Time is O(|actions|) because finding the argmax scans every action once; space is O(1) beyond the input list.",
    tests: [
      { call: "epsilon_greedy([0.1, 0.9, 0.3], 0.0)", expected: "1" }
    ]
  },
  {
    id: "rl-03",
    title: "Replay Buffer (Uniform Sampling)",
    pattern: "Off-Policy RL",
    torch: false,
    prompt: "Implement a fixed-capacity experience replay buffer supporting push(transition) and sample(batch_size).",
    approach: "A ring buffer (list with a write pointer) that overwrites the oldest entry once full.",
    starter: "import random\n\nclass ReplayBuffer:\n    def __init__(self, capacity):\n        # your code here\n        pass\n\n    def push(self, transition):\n        pass\n\n    def sample(self, batch_size):\n        pass\n",
    solution: "import random\n\nclass ReplayBuffer:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.buffer = []\n        self.pos = 0\n\n    def push(self, transition):\n        if len(self.buffer) < self.capacity:\n            self.buffer.append(transition)\n        else:\n            self.buffer[self.pos] = transition\n        self.pos = (self.pos + 1) % self.capacity\n\n    def sample(self, batch_size):\n        return random.sample(self.buffer, batch_size)\n\n    def __len__(self):\n        return len(self.buffer)\n",
    complexity: "O(1) push, O(batch_size) sample.",
    whyComplexity: "Time is O(1) for push since it's a fixed-index write to a preallocated list; sample is O(batch_size) since building the sampled batch touches each selected element once. Space is O(capacity) for the ring buffer.",
    tests: [
      { call: "(lambda b: (b.push(1), b.push(2), b.push(3), len(b))[3])(ReplayBuffer(2))", expected: "2" }
    ]
  },
  {
    id: "rl-04",
    title: "Generalized Advantage Estimation (GAE)",
    pattern: "Policy Gradient",
    torch: false,
    prompt: "Given lists of rewards, value estimates (length T+1, including the bootstrap value), and done flags, compute GAE advantages.",
    approach: "Backward recursive computation: the TD residual at each step, discounted and accumulated with the lambda-weighted advantage from the next step.",
    starter: "def compute_gae(rewards, values, dones, gamma=0.99, lam=0.95):\n    # your code here\n    pass\n",
    solution: "def compute_gae(rewards, values, dones, gamma=0.99, lam=0.95):\n    T = len(rewards)\n    advantages = [0.0] * T\n    last_gae = 0.0\n    for t in reversed(range(T)):\n        mask = 1.0 - dones[t]\n        delta = rewards[t] + gamma * values[t+1] * mask - values[t]\n        last_gae = delta + gamma * lam * mask * last_gae\n        advantages[t] = last_gae\n    return advantages\n",
    complexity: "O(T) time, O(T) space.",
    whyComplexity: "Time is O(T) because the backward recursion visits each timestep exactly once; space is O(T) for the returned advantages array.",
    tests: [
      { call: "[round(x,3) for x in compute_gae([1.0,1.0], [0.0,0.0,0.0], [0,1], gamma=1.0, lam=1.0)]", expected: "[2.0, 1.0]" }
    ]
  },
  {
    id: "rl-05",
    title: "PPO Clipped Surrogate Objective",
    pattern: "Policy Gradient",
    torch: true,
    prompt: "Implement the PPO policy loss given old and new log-probabilities and advantages (PyTorch).",
    approach: "Compute the probability ratio, apply it and its clipped version to the advantage, and take the minimum — PPO is pessimistic about how much the objective is allowed to improve in one step.",
    starter: "import torch\n\ndef ppo_loss(new_log_probs, old_log_probs, advantages, clip_eps=0.2):\n    # your code here\n    pass\n",
    solution: "import torch\n\ndef ppo_loss(new_log_probs, old_log_probs, advantages, clip_eps=0.2):\n    ratio = torch.exp(new_log_probs - old_log_probs)\n    unclipped = ratio * advantages\n    clipped = torch.clamp(ratio, 1 - clip_eps, 1 + clip_eps) * advantages\n    return -torch.min(unclipped, clipped).mean()\n",
    complexity: "O(batch size) time and space.",
    whyComplexity: "Time is O(batch size) because every tensor operation (exp, clamp, min) is applied elementwise once across the batch; space is O(batch size) for the intermediate tensors, which autograd needs to keep for the backward pass.",
    tests: []
  },
  {
    id: "rl-06",
    title: "REINFORCE Policy Gradient Loss",
    pattern: "Policy Gradient",
    torch: true,
    prompt: "Implement the vanilla policy gradient loss with a baseline (PyTorch).",
    approach: "Negative log-probability of the taken action, weighted by the normalized advantage (return minus baseline).",
    starter: "import torch\n\ndef reinforce_loss(log_probs, returns, baseline):\n    # your code here\n    pass\n",
    solution: "import torch\n\ndef reinforce_loss(log_probs, returns, baseline):\n    advantages = returns - baseline\n    advantages = (advantages - advantages.mean()) / (advantages.std() + 1e-8)\n    return -(log_probs * advantages.detach()).mean()\n",
    complexity: "O(batch size) time and space.",
    whyComplexity: "Time is O(batch size) for the same elementwise-operation reasoning as the PPO loss; space is O(batch size) for the advantage and log-probability tensors.",
    tests: []
  },
  {
    id: "rl-07",
    title: "Gaussian Actor-Critic Network",
    pattern: "Function Approximation",
    torch: true,
    prompt: "Define a PyTorch actor-critic network for a continuous action space, with a Gaussian policy head and a scalar value head.",
    approach: "Shared trunk feeding a mean and a state-independent log-std for the policy, plus a value head.",
    starter: "import torch\nimport torch.nn as nn\n\nclass ActorCritic(nn.Module):\n    def __init__(self, obs_dim, act_dim, hidden=256):\n        super().__init__()\n        # your code here\n        pass\n\n    def forward(self, obs):\n        pass\n",
    solution: "import torch\nimport torch.nn as nn\n\nclass ActorCritic(nn.Module):\n    def __init__(self, obs_dim, act_dim, hidden=256):\n        super().__init__()\n        self.trunk = nn.Sequential(\n            nn.Linear(obs_dim, hidden), nn.Tanh(),\n            nn.Linear(hidden, hidden), nn.Tanh(),\n        )\n        self.mean_head = nn.Linear(hidden, act_dim)\n        self.log_std = nn.Parameter(torch.zeros(act_dim))\n        self.value_head = nn.Linear(hidden, 1)\n\n    def forward(self, obs):\n        features = self.trunk(obs)\n        mean = self.mean_head(features)\n        std = self.log_std.exp().expand_as(mean)\n        value = self.value_head(features).squeeze(-1)\n        return torch.distributions.Normal(mean, std), value\n",
    complexity: "Forward pass is O(network size) per sample.",
    whyComplexity: "Time is O(network size) per forward pass, dominated by the matrix multiplications in the linear layers; space is O(network size) for the parameters plus O(batch size * hidden dim) for activations kept for backpropagation.",
    tests: []
  },
  {
    id: "rl-08",
    title: "Custom Gym-Style Environment Skeleton",
    pattern: "Environments",
    torch: false,
    prompt: "Implement a minimal custom environment with reset() and step(action) for a simplified 3D reach task, following the standard Gymnasium-style interface.",
    approach: "reset() returns the initial observation; step(action) returns (observation, reward, terminated, truncated, info). Use plain lists in place of numpy arrays if numpy is unavailable.",
    starter: "import random\n\nclass ReachEnv:\n    def __init__(self, max_steps=200):\n        # your code here\n        pass\n\n    def reset(self):\n        pass\n\n    def step(self, action):\n        pass\n",
    solution: "import random, math\n\nclass ReachEnv:\n    def __init__(self, max_steps=200):\n        self.max_steps = max_steps\n        self.pos = [0.0, 0.0, 0.0]\n        self.target = [0.0, 0.0, 0.0]\n        self.t = 0\n\n    def reset(self):\n        self.pos = [random.uniform(-1,1) for _ in range(3)]\n        self.target = [random.uniform(-1,1) for _ in range(3)]\n        self.t = 0\n        return self._obs()\n\n    def step(self, action):\n        self.pos = [p + max(-0.1, min(0.1, a)) for p, a in zip(self.pos, action)]\n        self.t += 1\n        dist = math.sqrt(sum((p-t)**2 for p, t in zip(self.pos, self.target)))\n        reward = -dist\n        terminated = dist < 0.02\n        truncated = self.t >= self.max_steps\n        return self._obs(), reward, terminated, truncated, {}\n\n    def _obs(self):\n        return self.pos + self.target\n",
    complexity: "O(1) time and space per step.",
    whyComplexity: "Time is O(1) per step because computing the new position and distance is a fixed number of arithmetic operations, independent of episode length; space is O(1) since the environment only tracks a constant amount of state.",
    tests: [
      { call: "len(ReachEnv().reset())", expected: "6" }
    ]
  },
  {
    id: "rl-09",
    title: "Reward Shaping for Reach-and-Grasp",
    pattern: "Reward Design",
    torch: false,
    prompt: "Given a sparse success/failure signal, design a shaped, dense reward function that speeds up learning without inviting reward hacking.",
    approach: "Combine a distance-based dense term, a bonus for successful grasp, a penalty for closing on nothing, and a small energy penalty — every term bounded so no single term can dominate and be exploited.",
    starter: "def shaped_reward(dist_to_object, gripper_closed, is_grasped, energy_used):\n    # your code here\n    pass\n",
    solution: "def shaped_reward(dist_to_object, gripper_closed, is_grasped, energy_used):\n    reward = -0.1 * dist_to_object\n    if is_grasped:\n        reward += 10.0\n    if gripper_closed and not is_grasped:\n        reward -= 0.5\n    reward -= 0.01 * energy_used\n    return reward\n",
    complexity: "O(1) time and space per step.",
    whyComplexity: "Time is O(1) per call because it's a fixed number of arithmetic comparisons and additions; space is O(1).",
    tests: [
      { call: "round(shaped_reward(0.0, True, True, 1.0), 3)", expected: "9.99" }
    ]
  },
  {
    id: "rl-10",
    title: "Batch Normalization From Scratch",
    pattern: "Deep Learning Fundamentals",
    torch: false,
    prompt: "Implement the forward pass of batch normalization using plain Python (list of lists) or NumPy, including the difference between training and inference mode. Reported as an actual Tesla ML interview question.",
    approach: "In training mode, normalize using the current batch's mean and variance and update running statistics; in inference mode, use the stored running statistics instead.",
    starter: "class BatchNorm:\n    def __init__(self, dim, momentum=0.9, eps=1e-5):\n        # your code here\n        pass\n\n    def forward(self, x, training=True):\n        pass\n",
    solution: "class BatchNorm:\n    def __init__(self, dim, momentum=0.9, eps=1e-5):\n        self.gamma = [1.0]*dim\n        self.beta = [0.0]*dim\n        self.running_mean = [0.0]*dim\n        self.running_var = [1.0]*dim\n        self.momentum = momentum\n        self.eps = eps\n        self.dim = dim\n\n    def forward(self, x, training=True):\n        n = len(x)\n        out = [[0.0]*self.dim for _ in range(n)]\n        for d in range(self.dim):\n            col = [x[i][d] for i in range(n)]\n            if training:\n                mean = sum(col)/n\n                var = sum((v-mean)**2 for v in col)/n\n                self.running_mean[d] = self.momentum*self.running_mean[d] + (1-self.momentum)*mean\n                self.running_var[d] = self.momentum*self.running_var[d] + (1-self.momentum)*var\n            else:\n                mean, var = self.running_mean[d], self.running_var[d]\n            for i in range(n):\n                norm = (x[i][d]-mean) / (var+self.eps)**0.5\n                out[i][d] = self.gamma[d]*norm + self.beta[d]\n        return out\n",
    complexity: "O(batch size * dim) time and space.",
    whyComplexity: "Time is O(batch size * dim) because computing the mean and variance, then normalizing, each touch every value in the batch once; space is O(batch size * dim) for the output, plus O(dim) for the running statistics.",
    tests: [
      { call: "[round(v,3) for row in BatchNorm(1).forward([[1.0],[3.0]]) for v in row]", expected: "[-1.0, 1.0]" }
    ]
  }
];

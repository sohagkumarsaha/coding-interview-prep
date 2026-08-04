// DSA problem bank — high-yield patterns for robot-learning coding rounds.
// Each problem: id, title, pattern, statement, approach, starter code, solution, complexity, tests.
const DSA_PROBLEMS = [
  {
    id: "dsa-01",
    title: "Two Sum",
    pattern: "Arrays & Hashing",
    prompt: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Assume exactly one solution exists and you may not use the same element twice.",
    example: "Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]",
    approach: "Single pass with a hash map from value to index. For each element, check whether target minus the current value has already been seen.",
    starter: "def two_sum(nums, target):\n    # your code here\n    pass\n",
    solution: "def two_sum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        complement = target - x\n        if complement in seen:\n            return [seen[complement], i]\n        seen[x] = i\n    return []\n",
    complexity: "O(n) time, O(n) space.",
    tests: [
      { call: "two_sum([2, 7, 11, 15], 9)", expected: "[0, 1]" },
      { call: "two_sum([3, 2, 4], 6)", expected: "[1, 2]" },
      { call: "two_sum([3, 3], 6)", expected: "[0, 1]" }
    ]
  },
  {
    id: "dsa-02",
    title: "Longest Substring Without Repeating Characters",
    pattern: "Sliding Window",
    prompt: "Given a string s, find the length of the longest substring without repeating characters.",
    example: "Input: s = \"abcabcbb\"\nOutput: 3   (\"abc\")",
    approach: "Sliding window with a hash map of last-seen index per character. Move the left pointer past the previous occurrence when a repeat is found inside the current window.",
    starter: "def length_of_longest_substring(s):\n    # your code here\n    pass\n",
    solution: "def length_of_longest_substring(s):\n    last_seen = {}\n    left = 0\n    best = 0\n    for right, ch in enumerate(s):\n        if ch in last_seen and last_seen[ch] >= left:\n            left = last_seen[ch] + 1\n        last_seen[ch] = right\n        best = max(best, right - left + 1)\n    return best\n",
    complexity: "O(n) time, O(min(n, alphabet size)) space.",
    tests: [
      { call: "length_of_longest_substring('abcabcbb')", expected: "3" },
      { call: "length_of_longest_substring('bbbbb')", expected: "1" },
      { call: "length_of_longest_substring('pwwkew')", expected: "3" }
    ]
  },
  {
    id: "dsa-03",
    title: "Container With Most Water",
    pattern: "Two Pointers",
    prompt: "Given heights at each index of an array, find two lines that, together with the x-axis, form the container that holds the most water.",
    example: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    approach: "Two pointers from both ends. Always move the pointer at the shorter line inward, since moving the taller one can only decrease or keep the width-limited area the same.",
    starter: "def max_area(height):\n    # your code here\n    pass\n",
    solution: "def max_area(height):\n    left, right = 0, len(height) - 1\n    best = 0\n    while left < right:\n        h = min(height[left], height[right])\n        best = max(best, h * (right - left))\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return best\n",
    complexity: "O(n) time, O(1) space.",
    tests: [
      { call: "max_area([1,8,6,2,5,4,8,3,7])", expected: "49" },
      { call: "max_area([1,1])", expected: "1" }
    ]
  },
  {
    id: "dsa-04",
    title: "Group Anagrams",
    pattern: "Arrays & Hashing",
    prompt: "Group a list of strings so that all anagrams of each other end up in the same group.",
    example: "Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
    approach: "Use the sorted string as a canonical key in a hash map; every anagram sorts to the same key.",
    starter: "def group_anagrams(strs):\n    # your code here\n    pass\n",
    solution: "def group_anagrams(strs):\n    groups = {}\n    for s in strs:\n        key = ''.join(sorted(s))\n        groups.setdefault(key, []).append(s)\n    return list(groups.values())\n",
    complexity: "O(n * k log k) time for n strings of average length k, O(n * k) space.",
    tests: [
      { call: "sorted([sorted(g) for g in group_anagrams(['eat','tea','tan','ate','nat','bat'])])", expected: "[['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']]" }
    ]
  },
  {
    id: "dsa-05",
    title: "LRU Cache",
    pattern: "Design / Hashing",
    prompt: "Design a Least Recently Used cache supporting get(key) and put(key, value) in O(1) time each, with a fixed capacity.",
    example: "cache = LRUCache(2)\ncache.put(1,1); cache.put(2,2)\ncache.get(1) -> 1\ncache.put(3,3)  # evicts key 2\ncache.get(2) -> -1",
    approach: "Combine a hash map (key to node) with a doubly linked list ordered by recency. Python's OrderedDict gives this for free; know the manual doubly-linked-list version too, since interviewers may ask you to implement it without OrderedDict.",
    starter: "class LRUCache:\n    def __init__(self, capacity):\n        # your code here\n        pass\n\n    def get(self, key):\n        pass\n\n    def put(self, key, value):\n        pass\n",
    solution: "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n\n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n",
    complexity: "O(1) amortized for get and put, O(capacity) space.",
    tests: [
      { call: "(lambda c: (c.put(1,1), c.put(2,2), c.get(1), c.put(3,3), c.get(2))[2])(LRUCache(2))", expected: "1" }
    ]
  },
  {
    id: "dsa-06",
    title: "Reverse a Linked List",
    pattern: "Linked Lists",
    prompt: "Reverse a singly linked list in place and return the new head.",
    example: "Input: 1 -> 2 -> 3 -> None\nOutput: 3 -> 2 -> 1 -> None",
    approach: "Iterate, re-pointing each node's next pointer to the previous node, tracking prev and curr as you go.",
    starter: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # your code here\n    pass\n",
    solution: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev\n\ndef to_list(head):\n    out = []\n    while head:\n        out.append(head.val)\n        head = head.next\n    return out\n\ndef from_list(vals):\n    head = None\n    for v in reversed(vals):\n        head = ListNode(v, head)\n    return head\n",
    complexity: "O(n) time, O(1) space.",
    tests: [
      { call: "to_list(reverse_list(from_list([1,2,3,4])))", expected: "[4, 3, 2, 1]" }
    ]
  },
  {
    id: "dsa-07",
    title: "Linked List Cycle Detection",
    pattern: "Linked Lists",
    prompt: "Given the head of a linked list, determine whether it contains a cycle.",
    example: "3 -> 2 -> 0 -> -4 -> (back to 2)   ->  True",
    approach: "Floyd's tortoise and hare: two pointers moving at speeds 1 and 2. If they ever meet, a cycle exists.",
    starter: "def has_cycle(head):\n    # your code here\n    pass\n",
    solution: "def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            return True\n    return False\n",
    complexity: "O(n) time, O(1) space.",
    tests: []
  },
  {
    id: "dsa-08",
    title: "Valid Parentheses",
    pattern: "Stacks & Queues",
    prompt: "Given a string of brackets ( ) [ ] { }, determine whether it is validly matched and nested.",
    example: "Input: s = \"([{}])\"\nOutput: True",
    approach: "Push opening brackets onto a stack. On a closing bracket, pop and check it matches the expected opener.",
    starter: "def is_valid(s):\n    # your code here\n    pass\n",
    solution: "def is_valid(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n",
    complexity: "O(n) time, O(n) space.",
    tests: [
      { call: "is_valid('([{}])')", expected: "True" },
      { call: "is_valid('([)]')", expected: "False" },
      { call: "is_valid('')", expected: "True" }
    ]
  },
  {
    id: "dsa-09",
    title: "Sliding Window Maximum",
    pattern: "Stacks & Queues",
    prompt: "Given an array and window size k, return the maximum of each sliding window as it moves across the array.",
    example: "Input: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]",
    approach: "Maintain a monotonic decreasing deque of indices. Pop from the back while the new value is larger, pop from the front when the front index falls outside the window.",
    starter: "from collections import deque\n\ndef max_sliding_window(nums, k):\n    # your code here\n    pass\n",
    solution: "from collections import deque\n\ndef max_sliding_window(nums, k):\n    dq = deque()\n    result = []\n    for i, x in enumerate(nums):\n        while dq and nums[dq[-1]] <= x:\n            dq.pop()\n        dq.append(i)\n        if dq[0] <= i - k:\n            dq.popleft()\n        if i >= k - 1:\n            result.append(nums[dq[0]])\n    return result\n",
    complexity: "O(n) time overall (amortized O(1) per element), O(k) space.",
    tests: [
      { call: "max_sliding_window([1,3,-1,-3,5,3,6,7], 3)", expected: "[3, 3, 5, 5, 6, 7]" }
    ]
  },
  {
    id: "dsa-10",
    title: "Binary Tree Level Order Traversal",
    pattern: "Trees & Graphs",
    prompt: "Return the values of a binary tree grouped by level, using breadth-first search.",
    example: "Tree: [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]",
    approach: "Standard BFS with a queue, processing one full level at a time by tracking the queue length at the start of each level.",
    starter: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef level_order(root):\n    # your code here\n    pass\n",
    solution: "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef level_order(root):\n    if not root:\n        return []\n    result, queue = [], deque([root])\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result\n",
    complexity: "O(n) time, O(n) space.",
    tests: []
  },
  {
    id: "dsa-11",
    title: "Number of Islands",
    pattern: "Trees & Graphs",
    prompt: "Given a 2D grid of '1' (land) and '0' (water), count the number of islands (4-directionally connected land regions).",
    example: "Input: grid = [['1','1','0'],['1','0','0'],['0','0','1']]\nOutput: 2",
    approach: "DFS or BFS flood-fill from every unvisited land cell, marking visited cells to avoid recounting. Generalizes directly to occupancy-grid connected-component reasoning.",
    starter: "def num_islands(grid):\n    # your code here\n    pass\n",
    solution: "def num_islands(grid):\n    if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n\n    def dfs(r, c):\n        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':\n            return\n        grid[r][c] = '0'\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            dfs(r+dr, c+dc)\n\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count += 1\n                dfs(r, c)\n    return count\n",
    complexity: "O(rows * cols) time and space.",
    tests: [
      { call: "num_islands([['1','1','0'],['1','0','0'],['0','0','1']])", expected: "2" }
    ]
  },
  {
    id: "dsa-12",
    title: "Course Schedule (Topological Sort)",
    pattern: "Trees & Graphs",
    prompt: "Given a number of courses and prerequisite pairs, determine whether all courses can be finished (whether the prerequisite graph is a DAG).",
    example: "Input: numCourses = 2, prerequisites = [[1,0]]\nOutput: True",
    approach: "Kahn's algorithm: compute in-degree per node, repeatedly remove zero-in-degree nodes. If all nodes are removed, there is no cycle. Maps directly to dependency scheduling in a robot's task or subsystem-init graph.",
    starter: "def can_finish(num_courses, prerequisites):\n    # your code here\n    pass\n",
    solution: "from collections import deque, defaultdict\n\ndef can_finish(num_courses, prerequisites):\n    graph = defaultdict(list)\n    in_degree = [0] * num_courses\n    for course, prereq in prerequisites:\n        graph[prereq].append(course)\n        in_degree[course] += 1\n    queue = deque(c for c in range(num_courses) if in_degree[c] == 0)\n    visited = 0\n    while queue:\n        node = queue.popleft()\n        visited += 1\n        for nxt in graph[node]:\n            in_degree[nxt] -= 1\n            if in_degree[nxt] == 0:\n                queue.append(nxt)\n    return visited == num_courses\n",
    complexity: "O(V + E) time, O(V + E) space.",
    tests: [
      { call: "can_finish(2, [[1,0]])", expected: "True" },
      { call: "can_finish(2, [[1,0],[0,1]])", expected: "False" }
    ]
  },
  {
    id: "dsa-13",
    title: "Dijkstra's Shortest Path",
    pattern: "Weighted Graphs",
    prompt: "Given a weighted graph with non-negative edge weights, find the shortest distance from a source node to every other node.",
    example: "graph = {0: [(1,4),(2,1)], 1: [(3,1)], 2: [(1,2),(3,5)], 3: []}\ndijkstra(graph, 0) -> {0:0, 1:3, 2:1, 3:4}",
    approach: "Greedy expansion with a min-heap: always expand the closest unvisited node, relaxing its neighbors' distances.",
    starter: "import heapq\n\ndef dijkstra(graph, source):\n    # your code here\n    pass\n",
    solution: "import heapq\n\ndef dijkstra(graph, source):\n    dist = {node: float('inf') for node in graph}\n    dist[source] = 0\n    heap = [(0, source)]\n    while heap:\n        d, node = heapq.heappop(heap)\n        if d > dist[node]:\n            continue\n        for neighbor, weight in graph[node]:\n            nd = d + weight\n            if nd < dist[neighbor]:\n                dist[neighbor] = nd\n                heapq.heappush(heap, (nd, neighbor))\n    return dist\n",
    complexity: "O((V + E) log V) time with a binary heap, O(V) space.",
    tests: [
      { call: "dijkstra({0:[(1,4),(2,1)],1:[(3,1)],2:[(1,2),(3,5)],3:[]}, 0)", expected: "{0: 0, 1: 3, 2: 1, 3: 4}" }
    ]
  },
  {
    id: "dsa-14",
    title: "Number of Connected Components (Union-Find)",
    pattern: "Weighted Graphs",
    prompt: "Given n nodes and a list of edges, count the number of connected components using a disjoint-set union structure.",
    example: "n = 5, edges = [[0,1],[1,2],[3,4]]\nOutput: 2",
    approach: "Disjoint-set union with path compression and union by rank. Useful anywhere you need to cluster readings or group joints into kinematic chains.",
    starter: "class UnionFind:\n    def __init__(self, n):\n        # your code here\n        pass\n\n    def find(self, x):\n        pass\n\n    def union(self, a, b):\n        pass\n",
    solution: "class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n        self.count = n\n\n    def find(self, x):\n        if self.parent[x] != x:\n            self.parent[x] = self.find(self.parent[x])\n        return self.parent[x]\n\n    def union(self, a, b):\n        ra, rb = self.find(a), self.find(b)\n        if ra == rb:\n            return\n        if self.rank[ra] < self.rank[rb]:\n            ra, rb = rb, ra\n        self.parent[rb] = ra\n        if self.rank[ra] == self.rank[rb]:\n            self.rank[ra] += 1\n        self.count -= 1\n\ndef count_components(n, edges):\n    uf = UnionFind(n)\n    for a, b in edges:\n        uf.union(a, b)\n    return uf.count\n",
    complexity: "Nearly O(1) amortized per operation (inverse-Ackermann), O(n) space.",
    tests: [
      { call: "count_components(5, [[0,1],[1,2],[3,4]])", expected: "2" }
    ]
  },
  {
    id: "dsa-15",
    title: "Kth Largest Element in an Array",
    pattern: "Heaps",
    prompt: "Find the kth largest element in an unsorted array.",
    example: "Input: nums = [3,2,1,5,6,4], k = 2\nOutput: 5",
    approach: "Maintain a min-heap of size k while scanning the array; the heap's root is the kth largest at the end.",
    starter: "import heapq\n\ndef find_kth_largest(nums, k):\n    # your code here\n    pass\n",
    solution: "import heapq\n\ndef find_kth_largest(nums, k):\n    heap = nums[:k]\n    heapq.heapify(heap)\n    for x in nums[k:]:\n        if x > heap[0]:\n            heapq.heapreplace(heap, x)\n    return heap[0]\n",
    complexity: "O(n log k) time, O(k) space.",
    tests: [
      { call: "find_kth_largest([3,2,1,5,6,4], 2)", expected: "5" }
    ]
  },
  {
    id: "dsa-16",
    title: "Merge k Sorted Lists",
    pattern: "Heaps",
    prompt: "Merge k sorted arrays into a single sorted array.",
    example: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    approach: "Push the head of each list onto a min-heap keyed by value; repeatedly pop the smallest and push its successor. Directly applicable to merging sorted, timestamped logs from multiple robots.",
    starter: "import heapq\n\ndef merge_k_sorted(lists):\n    # your code here\n    pass\n",
    solution: "import heapq\n\ndef merge_k_sorted(lists):\n    heap = []\n    for i, lst in enumerate(lists):\n        if lst:\n            heapq.heappush(heap, (lst[0], i, 0))\n    result = []\n    while heap:\n        val, li, ei = heapq.heappop(heap)\n        result.append(val)\n        if ei + 1 < len(lists[li]):\n            heapq.heappush(heap, (lists[li][ei+1], li, ei+1))\n    return result\n",
    complexity: "O(N log k) time for N total elements across k lists, O(k) space.",
    tests: [
      { call: "merge_k_sorted([[1,4,5],[1,3,4],[2,6]])", expected: "[1, 1, 2, 3, 4, 4, 5, 6]" }
    ]
  },
  {
    id: "dsa-17",
    title: "House Robber",
    pattern: "Dynamic Programming",
    prompt: "Given amounts of money at houses in a row, maximize the sum you can rob without robbing two adjacent houses.",
    example: "Input: nums = [2,7,9,3,1]\nOutput: 12",
    approach: "1D DP. At each house, decide to skip it (carry forward the best so far) or take it (best two houses back plus current).",
    starter: "def rob(nums):\n    # your code here\n    pass\n",
    solution: "def rob(nums):\n    prev, curr = 0, 0\n    for x in nums:\n        prev, curr = curr, max(curr, prev + x)\n    return curr\n",
    complexity: "O(n) time, O(1) space.",
    tests: [
      { call: "rob([2,7,9,3,1])", expected: "12" },
      { call: "rob([2,1,1,2])", expected: "4" }
    ]
  },
  {
    id: "dsa-18",
    title: "Longest Common Subsequence",
    pattern: "Dynamic Programming",
    prompt: "Given two strings, find the length of their longest common subsequence.",
    example: "Input: text1 = \"abcde\", text2 = \"ace\"\nOutput: 3",
    approach: "2D DP where dp[i][j] is the LCS length of the first i characters of s1 and first j of s2. A match extends the diagonal; a mismatch takes the best of dropping a character from either string.",
    starter: "def lcs(s1, s2):\n    # your code here\n    pass\n",
    solution: "def lcs(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if s1[i-1] == s2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\n",
    complexity: "O(m * n) time and space.",
    tests: [
      { call: "lcs('abcde', 'ace')", expected: "3" }
    ]
  },
  {
    id: "dsa-19",
    title: "Coin Change",
    pattern: "Dynamic Programming",
    prompt: "Given coin denominations and a target amount, find the minimum number of coins to reach that amount, or -1 if impossible.",
    example: "Input: coins = [1,2,5], amount = 11\nOutput: 3   (5+5+1)",
    approach: "Bottom-up unbounded-knapsack DP: dp[amount] is the fewest coins to make that amount, built from smaller amounts.",
    starter: "def coin_change(coins, amount):\n    # your code here\n    pass\n",
    solution: "def coin_change(coins, amount):\n    dp = [0] + [float('inf')] * amount\n    for a in range(1, amount + 1):\n        for c in coins:\n            if c <= a:\n                dp[a] = min(dp[a], dp[a-c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1\n",
    complexity: "O(amount * len(coins)) time, O(amount) space.",
    tests: [
      { call: "coin_change([1,2,5], 11)", expected: "3" },
      { call: "coin_change([2], 3)", expected: "-1" }
    ]
  },
  {
    id: "dsa-20",
    title: "Edit Distance",
    pattern: "Dynamic Programming",
    prompt: "Given two strings, find the minimum number of insertions, deletions, and substitutions to convert one into the other.",
    example: "Input: word1 = \"horse\", word2 = \"ros\"\nOutput: 3",
    approach: "2D DP identical in structure to LCS; each cell takes the best of insert, delete, or substitute from its neighbors.",
    starter: "def edit_distance(s1, s2):\n    # your code here\n    pass\n",
    solution: "def edit_distance(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0] = i\n    for j in range(n+1): dp[0][j] = j\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if s1[i-1] == s2[j-1]:\n                dp[i][j] = dp[i-1][j-1]\n            else:\n                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]\n",
    complexity: "O(m * n) time and space.",
    tests: [
      { call: "edit_distance('horse', 'ros')", expected: "3" }
    ]
  },
  {
    id: "dsa-21",
    title: "Subsets",
    pattern: "Backtracking",
    prompt: "Return all possible subsets (the power set) of a set of distinct integers.",
    example: "Input: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]  (any order)",
    approach: "Backtracking: at each index, branch into including or excluding the element, recording the subset at each leaf.",
    starter: "def subsets(nums):\n    # your code here\n    pass\n",
    solution: "def subsets(nums):\n    result = []\n    def backtrack(start, path):\n        result.append(path[:])\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return result\n",
    complexity: "O(2^n) time and space.",
    tests: [
      { call: "len(subsets([1,2,3]))", expected: "8" }
    ]
  },
  {
    id: "dsa-22",
    title: "Search in Rotated Sorted Array",
    pattern: "Binary Search",
    prompt: "Search for a target in a sorted array that has been rotated at an unknown pivot, in O(log n) time.",
    example: "Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
    approach: "Modified binary search: at each step, determine which half is properly sorted, then check whether the target lies within that half's range to decide which side to recurse into.",
    starter: "def search_rotated(nums, target):\n    # your code here\n    pass\n",
    solution: "def search_rotated(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[lo] <= nums[mid]:\n            if nums[lo] <= target < nums[mid]:\n                hi = mid - 1\n            else:\n                lo = mid + 1\n        else:\n            if nums[mid] < target <= nums[hi]:\n                lo = mid + 1\n            else:\n                hi = mid - 1\n    return -1\n",
    complexity: "O(log n) time, O(1) space.",
    tests: [
      { call: "search_rotated([4,5,6,7,0,1,2], 0)", expected: "4" },
      { call: "search_rotated([4,5,6,7,0,1,2], 3)", expected: "-1" }
    ]
  }
];

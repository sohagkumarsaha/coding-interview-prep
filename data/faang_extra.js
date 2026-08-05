// FAANG Extended — the highest-value patterns Blind 75 leaves out: Advanced
// Graphs, 2D DP, Greedy, Math & Geometry, deeper Bit Manipulation and
// Backtracking, plus a few universally-cited FAANG staples (Trapping Rain
// Water, Rotting Oranges, Merge Sorted Array). Same original-content policy
// as the rest of this site.
const FAANG_EXTRA_PROBLEMS = [
  // ---------------- Advanced Graphs ----------------
  {
    id: "fx-01", title: "Network Delay Time", category: "Advanced Graphs",
    prompt: "Given directed edges (u, v, weight) representing signal travel times, and a source node k, find how long it takes for a signal to reach every node. Return -1 if some node is unreachable.",
    example: "Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2\nOutput: 2",
    approach: "Dijkstra's algorithm from k; the answer is the maximum shortest distance across all nodes, or -1 if any node was never reached.",
    starter: "import heapq\nfrom collections import defaultdict\n\ndef network_delay_time(times, n, k):\n    # your code here\n    pass\n",
    solution: "import heapq\nfrom collections import defaultdict\n\ndef network_delay_time(times, n, k):\n    graph = defaultdict(list)\n    for u, v, w in times:\n        graph[u].append((v, w))\n    dist = {}\n    heap = [(0, k)]\n    while heap:\n        d, node = heapq.heappop(heap)\n        if node in dist:\n            continue\n        dist[node] = d\n        for nei, w in graph[node]:\n            if nei not in dist:\n                heapq.heappush(heap, (d + w, nei))\n    return max(dist.values()) if len(dist) == n else -1\n",
    complexity: "O(E log V) time, O(V + E) space.",
    tests: [{ call: "network_delay_time([[2,1,1],[2,3,1],[3,4,1]], 4, 2)", expected: "2" }]
  },
  {
    id: "fx-02", title: "Cheapest Flights Within K Stops", category: "Advanced Graphs",
    prompt: "Given flights as (from, to, price) and a maximum number of stops k, find the cheapest price from src to dst using at most k stops (k+1 edges).",
    example: "Input: n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1\nOutput: 700",
    approach: "Bellman-Ford limited to k+1 relaxation rounds — plain Dijkstra doesn't respect the stop-count constraint, since a cheaper-but-longer path could otherwise win.",
    starter: "def find_cheapest_price(n, flights, src, dst, k):\n    # your code here\n    pass\n",
    solution: "def find_cheapest_price(n, flights, src, dst, k):\n    prices = [float('inf')] * n\n    prices[src] = 0\n    for _ in range(k + 1):\n        temp = prices[:]\n        for u, v, w in flights:\n            if prices[u] != float('inf') and prices[u] + w < temp[v]:\n                temp[v] = prices[u] + w\n        prices = temp\n    return prices[dst] if prices[dst] != float('inf') else -1\n",
    complexity: "O(k * E) time, O(V) space.",
    tests: [{ call: "find_cheapest_price(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1)", expected: "700" }]
  },
  {
    id: "fx-03", title: "Redundant Connection", category: "Advanced Graphs",
    prompt: "A tree with n nodes had one extra edge added, creating exactly one cycle. Given the edge list, find the edge that can be removed to restore a tree.",
    example: "Input: edges = [[1,2],[1,3],[2,3]]\nOutput: [2, 3]",
    approach: "Union-Find: add edges one at a time; the first edge whose two endpoints are already connected is the redundant one.",
    starter: "def find_redundant_connection(edges):\n    # your code here\n    pass\n",
    solution: "def find_redundant_connection(edges):\n    n = len(edges)\n    parent = list(range(n + 1))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    for a, b in edges:\n        ra, rb = find(a), find(b)\n        if ra == rb:\n            return [a, b]\n        parent[ra] = rb\n    return []\n",
    complexity: "Nearly O(n) time with union-find, O(n) space.",
    tests: [{ call: "find_redundant_connection([[1,2],[1,3],[2,3]])", expected: "[2, 3]" }]
  },
  {
    id: "fx-04", title: "Word Ladder", category: "Advanced Graphs",
    prompt: "Given a begin word, an end word, and a word list, find the length of the shortest transformation sequence where each step changes exactly one letter and every intermediate word must be in the list.",
    example: "Input: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: 5",
    approach: "BFS over the implicit graph where words are connected if they differ by one letter; BFS naturally finds the shortest path in an unweighted graph.",
    starter: "from collections import deque\n\ndef ladder_length(begin_word, end_word, word_list):\n    # your code here\n    pass\n",
    solution: "from collections import deque\n\ndef ladder_length(begin_word, end_word, word_list):\n    word_set = set(word_list)\n    if end_word not in word_set:\n        return 0\n    queue = deque([(begin_word, 1)])\n    visited = {begin_word}\n    while queue:\n        word, steps = queue.popleft()\n        if word == end_word:\n            return steps\n        for i in range(len(word)):\n            for c in 'abcdefghijklmnopqrstuvwxyz':\n                new_word = word[:i] + c + word[i+1:]\n                if new_word in word_set and new_word not in visited:\n                    visited.add(new_word)\n                    queue.append((new_word, steps + 1))\n    return 0\n",
    complexity: "O(M^2 * N) time for N words of length M, O(M * N) space.",
    tests: [{ call: "ladder_length('hit', 'cog', ['hot','dot','dog','lot','log','cog'])", expected: "5" }]
  },

  // ---------------- 2D Dynamic Programming ----------------
  {
    id: "fx-05", title: "Unique Paths II", category: "2D Dynamic Programming",
    prompt: "Same as Unique Paths, but some grid cells are obstacles (marked 1) that cannot be entered.",
    example: "Input: grid = [[0,0,0],[0,1,0],[0,0,0]]\nOutput: 2",
    approach: "Same DP grid as Unique Paths, but any obstacle cell is forced to 0 paths, which naturally blocks paths from flowing through it.",
    starter: "def unique_paths_with_obstacles(grid):\n    # your code here\n    pass\n",
    solution: "def unique_paths_with_obstacles(grid):\n    rows, cols = len(grid), len(grid[0])\n    dp = [[0]*cols for _ in range(rows)]\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 1:\n                dp[r][c] = 0\n            elif r == 0 and c == 0:\n                dp[r][c] = 1\n            else:\n                top = dp[r-1][c] if r > 0 else 0\n                left = dp[r][c-1] if c > 0 else 0\n                dp[r][c] = top + left\n    return dp[rows-1][cols-1]\n",
    complexity: "O(rows * cols) time and space.",
    tests: [{ call: "unique_paths_with_obstacles([[0,0,0],[0,1,0],[0,0,0]])", expected: "2" }]
  },
  {
    id: "fx-06", title: "Longest Palindromic Subsequence", category: "2D Dynamic Programming",
    prompt: "Given a string, find the length of its longest palindromic subsequence (not necessarily contiguous).",
    example: "Input: s = \"bbbab\"\nOutput: 4   (\"bbbb\")",
    approach: "2D interval DP: dp[i][j] is the longest palindromic subsequence within s[i..j]. If the endpoints match, they wrap the inner answer plus 2; otherwise take the best of dropping either endpoint.",
    starter: "def longest_palindrome_subseq(s):\n    # your code here\n    pass\n",
    solution: "def longest_palindrome_subseq(s):\n    n = len(s)\n    dp = [[0]*n for _ in range(n)]\n    for i in range(n-1, -1, -1):\n        dp[i][i] = 1\n        for j in range(i+1, n):\n            if s[i] == s[j]:\n                dp[i][j] = dp[i+1][j-1] + 2\n            else:\n                dp[i][j] = max(dp[i+1][j], dp[i][j-1])\n    return dp[0][n-1]\n",
    complexity: "O(n^2) time and space.",
    tests: [{ call: "longest_palindrome_subseq('bbbab')", expected: "4" }]
  },
  {
    id: "fx-07", title: "Distinct Subsequences", category: "2D Dynamic Programming",
    prompt: "Given strings s and t, count the number of distinct ways t appears as a subsequence of s.",
    example: "Input: s = \"rabbbit\", t = \"rabbit\"\nOutput: 3",
    approach: "2D DP: dp[i][j] is the number of ways t[:j] is a subsequence of s[:i]. Every position in s can either be skipped, or, if it matches the current character of t, used to extend a match.",
    starter: "def num_distinct(s, t):\n    # your code here\n    pass\n",
    solution: "def num_distinct(s, t):\n    m, n = len(s), len(t)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1):\n        dp[i][0] = 1\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            dp[i][j] = dp[i-1][j]\n            if s[i-1] == t[j-1]:\n                dp[i][j] += dp[i-1][j-1]\n    return dp[m][n]\n",
    complexity: "O(m * n) time and space.",
    tests: [{ call: "num_distinct('rabbbit', 'rabbit')", expected: "3" }]
  },

  // ---------------- Greedy ----------------
  {
    id: "fx-08", title: "Jump Game II", category: "Greedy",
    prompt: "Given an array where each element is your maximum jump length from that index, find the minimum number of jumps to reach the last index.",
    example: "Input: nums = [2,3,1,1,4]\nOutput: 2",
    approach: "Greedy BFS-by-levels: track the farthest reachable index within the current jump, and increment the jump count each time you must move past the current jump's boundary.",
    starter: "def jump(nums):\n    # your code here\n    pass\n",
    solution: "def jump(nums):\n    jumps = 0\n    curr_end = 0\n    farthest = 0\n    for i in range(len(nums) - 1):\n        farthest = max(farthest, i + nums[i])\n        if i == curr_end:\n            jumps += 1\n            curr_end = farthest\n    return jumps\n",
    complexity: "O(n) time, O(1) space.",
    tests: [{ call: "jump([2,3,1,1,4])", expected: "2" }]
  },
  {
    id: "fx-09", title: "Gas Station", category: "Greedy",
    prompt: "Given gas available and cost to travel between n gas stations arranged in a circle, find the starting station index from which you can complete the circuit, or -1 if impossible.",
    example: "Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]\nOutput: 3",
    approach: "If total gas is less than total cost, it's impossible. Otherwise, greedily reset the candidate start every time the running tank goes negative — everything before that point could not have been a valid start either.",
    starter: "def can_complete_circuit(gas, cost):\n    # your code here\n    pass\n",
    solution: "def can_complete_circuit(gas, cost):\n    if sum(gas) < sum(cost):\n        return -1\n    total = 0\n    start = 0\n    for i in range(len(gas)):\n        total += gas[i] - cost[i]\n        if total < 0:\n            start = i + 1\n            total = 0\n    return start\n",
    complexity: "O(n) time, O(1) space.",
    tests: [{ call: "can_complete_circuit([1,2,3,4,5], [3,4,5,1,2])", expected: "3" }]
  },
  {
    id: "fx-10", title: "Task Scheduler", category: "Greedy",
    prompt: "Given a list of CPU tasks and a cooldown n between two identical tasks, find the minimum number of intervals needed to finish all tasks (idling allowed).",
    example: "Input: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2\nOutput: 8   (A B idle A B idle A B)",
    approach: "The most frequent task defines a skeleton of (max_count - 1) full cooldown blocks; fill each block with other tasks, and any tasks left over just append at the end. The formula max(len(tasks), (max_count-1)*(n+1) + num_tasks_at_max_count) captures both the task-scarce and task-abundant cases.",
    starter: "from collections import Counter\n\ndef least_interval(tasks, n):\n    # your code here\n    pass\n",
    solution: "from collections import Counter\n\ndef least_interval(tasks, n):\n    counts = Counter(tasks)\n    max_count = max(counts.values())\n    num_max = sum(1 for c in counts.values() if c == max_count)\n    return max(len(tasks), (max_count - 1) * (n + 1) + num_max)\n",
    complexity: "O(n) time, O(1) space (bounded alphabet of task types).",
    tests: [{ call: "least_interval(['A','A','A','B','B','B'], 2)", expected: "8" }]
  },

  // ---------------- Intervals ----------------
  {
    id: "fx-11", title: "Interval List Intersections", category: "Intervals",
    prompt: "Given two lists of closed, disjoint, sorted intervals, return their intersection.",
    example: "Input: firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]\nOutput: [[1,2],[5,5],[8,10]]",
    approach: "Two pointers, one per list. At each step compute the overlap of the current pair (if any), then advance whichever interval ends first, since it can't overlap anything further.",
    starter: "def interval_intersection(first_list, second_list):\n    # your code here\n    pass\n",
    solution: "def interval_intersection(first_list, second_list):\n    result = []\n    i, j = 0, 0\n    while i < len(first_list) and j < len(second_list):\n        lo = max(first_list[i][0], second_list[j][0])\n        hi = min(first_list[i][1], second_list[j][1])\n        if lo <= hi:\n            result.append([lo, hi])\n        if first_list[i][1] < second_list[j][1]:\n            i += 1\n        else:\n            j += 1\n    return result\n",
    complexity: "O(m + n) time, O(1) extra space.",
    tests: [{ call: "interval_intersection([[0,2],[5,10]], [[1,5],[8,12]])", expected: "[[1, 2], [5, 5], [8, 10]]" }]
  },

  // ---------------- Math & Geometry ----------------
  {
    id: "fx-12", title: "Pow(x, n)", category: "Math & Geometry",
    prompt: "Implement pow(x, n), computing x raised to the integer power n, in O(log n) time.",
    example: "Input: x = 2.0, n = 10\nOutput: 1024.0",
    approach: "Fast exponentiation by squaring: repeatedly square the base and halve the exponent, multiplying the result in whenever the current bit of the exponent is set.",
    starter: "def my_pow(x, n):\n    # your code here\n    pass\n",
    solution: "def my_pow(x, n):\n    if n < 0:\n        x = 1 / x\n        n = -n\n    result = 1\n    while n:\n        if n & 1:\n            result *= x\n        x *= x\n        n >>= 1\n    return result\n",
    complexity: "O(log n) time, O(1) space.",
    tests: [{ call: "my_pow(2.0, 10)", expected: "1024.0" }]
  },
  {
    id: "fx-13", title: "Sqrt(x)", category: "Math & Geometry",
    prompt: "Compute the integer square root of a non-negative integer x (the floor of the true square root), without using a built-in power/sqrt function.",
    example: "Input: x = 8\nOutput: 2",
    approach: "Binary search on the answer between 1 and x, since 'mid*mid <= x' is monotonic.",
    starter: "def my_sqrt(x):\n    # your code here\n    pass\n",
    solution: "def my_sqrt(x):\n    if x < 2:\n        return x\n    lo, hi = 1, x\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if mid * mid <= x:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return hi\n",
    complexity: "O(log x) time, O(1) space.",
    tests: [{ call: "my_sqrt(8)", expected: "2" }, { call: "my_sqrt(4)", expected: "2" }]
  },
  {
    id: "fx-14", title: "Happy Number", category: "Math & Geometry",
    prompt: "A happy number is defined by repeatedly replacing it with the sum of the squares of its digits, until it reaches 1 (happy) or loops forever (not happy). Determine whether a number is happy.",
    example: "Input: n = 19\nOutput: True",
    approach: "Track visited values in a set; if a value repeats before reaching 1, it's in a cycle and will never reach 1.",
    starter: "def is_happy(n):\n    # your code here\n    pass\n",
    solution: "def is_happy(n):\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        n = sum(int(d)**2 for d in str(n))\n    return n == 1\n",
    complexity: "O(log n) time per step, bounded number of steps before a cycle or 1 is reached.",
    tests: [{ call: "is_happy(19)", expected: "True" }, { call: "is_happy(2)", expected: "False" }]
  },
  {
    id: "fx-15", title: "Rotate Array", category: "Math & Geometry",
    prompt: "Rotate an array to the right by k steps, in place.",
    example: "Input: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]",
    approach: "k modulo the array length handles k larger than the array; then it's just a slice-and-concatenate split at the rotation point.",
    starter: "def rotate_array(nums, k):\n    # your code here\n    pass\n",
    solution: "def rotate_array(nums, k):\n    n = len(nums)\n    k %= n\n    nums[:] = (nums[-k:] + nums[:-k]) if k else nums\n    return nums\n",
    complexity: "O(n) time, O(n) space for the rotated copy.",
    tests: [{ call: "rotate_array([1,2,3,4,5,6,7], 3)", expected: "[5, 6, 7, 1, 2, 3, 4]" }]
  },

  // ---------------- Bit Manipulation ----------------
  {
    id: "fx-16", title: "Single Number", category: "Bit Manipulation",
    prompt: "Given an array where every element appears twice except one, find the element that appears only once, in O(n) time and O(1) space.",
    example: "Input: nums = [4,1,2,1,2]\nOutput: 4",
    approach: "XOR every element together. Identical pairs cancel to 0 (x ^ x = 0), leaving only the unpaired element.",
    starter: "def single_number(nums):\n    # your code here\n    pass\n",
    solution: "def single_number(nums):\n    result = 0\n    for x in nums:\n        result ^= x\n    return result\n",
    complexity: "O(n) time, O(1) space.",
    tests: [{ call: "single_number([4,1,2,1,2])", expected: "4" }]
  },
  {
    id: "fx-17", title: "Power of Two", category: "Bit Manipulation",
    prompt: "Determine whether a given integer is a power of two.",
    example: "Input: n = 16\nOutput: True",
    approach: "A power of two has exactly one set bit, so n & (n-1) clears that single bit and leaves 0 — with the important edge case that n must be positive first.",
    starter: "def is_power_of_two(n):\n    # your code here\n    pass\n",
    solution: "def is_power_of_two(n):\n    return n > 0 and (n & (n - 1)) == 0\n",
    complexity: "O(1) time, O(1) space.",
    tests: [{ call: "is_power_of_two(16)", expected: "True" }, { call: "is_power_of_two(3)", expected: "False" }]
  },
  {
    id: "fx-18", title: "Bitwise AND of Numbers Range", category: "Bit Manipulation",
    prompt: "Given a range [left, right], return the bitwise AND of all integers in that range, inclusive.",
    example: "Input: left = 5, right = 7\nOutput: 4",
    approach: "Any bit that differs anywhere in the range will be zeroed out by some number in between, so the answer is just the common binary prefix of left and right, shifted back into place.",
    starter: "def range_bitwise_and(left, right):\n    # your code here\n    pass\n",
    solution: "def range_bitwise_and(left, right):\n    shift = 0\n    while left != right:\n        left >>= 1\n        right >>= 1\n        shift += 1\n    return left << shift\n",
    complexity: "O(log(right)) time, O(1) space.",
    tests: [{ call: "range_bitwise_and(5, 7)", expected: "4" }]
  },

  // ---------------- Backtracking ----------------
  {
    id: "fx-19", title: "Combination Sum", category: "Backtracking",
    prompt: "Given distinct candidate numbers and a target, return all unique combinations that sum to target. The same number may be reused unlimited times.",
    example: "Input: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]",
    approach: "Backtracking that, unlike Subsets or Permutations, does not advance the start index when reusing a candidate — only when moving on to the next distinct candidate.",
    starter: "def combination_sum(candidates, target):\n    # your code here\n    pass\n",
    solution: "def combination_sum(candidates, target):\n    result = []\n    def backtrack(start, path, remaining):\n        if remaining == 0:\n            result.append(path[:])\n            return\n        if remaining < 0:\n            return\n        for i in range(start, len(candidates)):\n            path.append(candidates[i])\n            backtrack(i, path, remaining - candidates[i])\n            path.pop()\n    backtrack(0, [], target)\n    return result\n",
    complexity: "O(2^target) worst case time.",
    tests: [{ call: "combination_sum([2,3,6,7], 7)", expected: "[[2, 2, 3], [7]]" }]
  },
  {
    id: "fx-20", title: "Permutations", category: "Backtracking",
    prompt: "Given an array of distinct integers, return all possible permutations.",
    example: "Input: nums = [1,2,3]\nOutput: 6 permutations",
    approach: "Backtracking: at each step, try every not-yet-used number as the next element of the path.",
    starter: "def permute(nums):\n    # your code here\n    pass\n",
    solution: "def permute(nums):\n    result = []\n    def backtrack(path, remaining):\n        if not remaining:\n            result.append(path[:])\n            return\n        for i in range(len(remaining)):\n            path.append(remaining[i])\n            backtrack(path, remaining[:i] + remaining[i+1:])\n            path.pop()\n    backtrack([], nums)\n    return result\n",
    complexity: "O(n! * n) time.",
    tests: [{ call: "len(permute([1,2,3]))", expected: "6" }]
  },
  {
    id: "fx-21", title: "N-Queens", category: "Backtracking",
    prompt: "Count the number of ways to place n queens on an n x n chessboard so that no two queens attack each other.",
    example: "Input: n = 4\nOutput: 2",
    approach: "Backtracking, placing one queen per row. Track occupied columns and both diagonals (row-col and row+col are each constant along a diagonal) to check attacks in O(1).",
    starter: "def total_n_queens(n):\n    # your code here\n    pass\n",
    solution: "def total_n_queens(n):\n    count = 0\n    cols, diag1, diag2 = set(), set(), set()\n    def backtrack(row):\n        nonlocal count\n        if row == n:\n            count += 1\n            return\n        for col in range(n):\n            if col in cols or (row - col) in diag1 or (row + col) in diag2:\n                continue\n            cols.add(col); diag1.add(row - col); diag2.add(row + col)\n            backtrack(row + 1)\n            cols.remove(col); diag1.remove(row - col); diag2.remove(row + col)\n    backtrack(0)\n    return count\n",
    complexity: "O(n!) worst case time.",
    tests: [{ call: "total_n_queens(4)", expected: "2" }]
  },
  {
    id: "fx-22", title: "Word Break II", category: "Backtracking",
    prompt: "Given a string and a dictionary, return every possible sentence formed by inserting spaces to segment the string into dictionary words.",
    example: "Input: s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]\nOutput: [\"cats and dog\", \"cat sand dog\"]",
    approach: "Backtracking with memoization on the starting index: for each valid dictionary word starting at the current position, recurse on the remainder and prepend the word to every resulting sentence.",
    starter: "def word_break_ii(s, word_dict):\n    # your code here\n    pass\n",
    solution: "def word_break_ii(s, word_dict):\n    word_set = set(word_dict)\n    memo = {}\n    def backtrack(start):\n        if start == len(s):\n            return [\"\"]\n        if start in memo:\n            return memo[start]\n        sentences = []\n        for end in range(start + 1, len(s) + 1):\n            word = s[start:end]\n            if word in word_set:\n                for rest in backtrack(end):\n                    sentences.append(word + (\"\" if rest == \"\" else \" \" + rest))\n        memo[start] = sentences\n        return sentences\n    return backtrack(0)\n",
    complexity: "O(2^n) worst case time, memoization prunes it substantially in practice.",
    tests: [{ call: "sorted(word_break_ii('catsanddog', ['cat','cats','and','sand','dog']))", expected: "['cat sand dog', 'cats and dog']" }]
  },

  // ---------------- Heap ----------------
  {
    id: "fx-23", title: "Kth Largest Element in a Stream", category: "Heap",
    prompt: "Design a class that, given an initial array and a value k, supports adding new values one at a time and always reports the kth largest value seen so far.",
    example: "kl = KthLargest(3, [4,5,8,2]); kl.add(3) -> 4; kl.add(5) -> 5; kl.add(10) -> 5",
    approach: "Maintain a min-heap of size k. The heap's root is always the kth largest, since the k largest values seen are exactly the ones sitting in the heap.",
    starter: "import heapq\n\nclass KthLargest:\n    def __init__(self, k, nums):\n        # your code here\n        pass\n\n    def add(self, val):\n        pass\n",
    solution: "import heapq\n\nclass KthLargest:\n    def __init__(self, k, nums):\n        self.k = k\n        self.heap = nums[:]\n        heapq.heapify(self.heap)\n        while len(self.heap) > k:\n            heapq.heappop(self.heap)\n\n    def add(self, val):\n        heapq.heappush(self.heap, val)\n        if len(self.heap) > self.k:\n            heapq.heappop(self.heap)\n        return self.heap[0]\n",
    complexity: "O(log k) time per add, O(k) space.",
    tests: [{ call: "(lambda kl: [kl.add(3), kl.add(5), kl.add(10), kl.add(9), kl.add(4)])(KthLargest(3, [4,5,8,2]))", expected: "[4, 5, 5, 8, 8]" }]
  },

  // ---------------- FAANG staples worth calling out by name ----------------
  {
    id: "fx-24", title: "Rotting Oranges", category: "Graphs (Staple)",
    prompt: "Given a grid of fresh (1), rotten (2), and empty (0) oranges, find the minimum minutes until no fresh orange remains, or -1 if impossible.",
    example: "Input: grid = [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4",
    approach: "Multi-source BFS starting from every rotten orange simultaneously, tracking elapsed minutes per BFS layer.",
    starter: "from collections import deque\n\ndef oranges_rotting(grid):\n    # your code here\n    pass\n",
    solution: "from collections import deque\n\ndef oranges_rotting(grid):\n    rows, cols = len(grid), len(grid[0])\n    queue = deque()\n    fresh = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == 2:\n                queue.append((r, c, 0))\n            elif grid[r][c] == 1:\n                fresh += 1\n    minutes = 0\n    while queue:\n        r, c, t = queue.popleft()\n        minutes = max(minutes, t)\n        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n            nr, nc = r+dr, c+dc\n            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:\n                grid[nr][nc] = 2\n                fresh -= 1\n                queue.append((nr, nc, t+1))\n    return minutes if fresh == 0 else -1\n",
    complexity: "O(rows * cols) time and space.",
    tests: [{ call: "oranges_rotting([[2,1,1],[1,1,0],[0,1,1]])", expected: "4" }]
  },
  {
    id: "fx-25", title: "Trapping Rain Water", category: "Two Pointers (Staple)",
    prompt: "Given an elevation map, compute how much water it can trap after raining.",
    example: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    approach: "Two pointers from both ends, each tracking the max height seen from its side. The water trapped at the shorter side's current position is bounded by that side's running max, since the taller side guarantees a wall at least that high exists further along.",
    starter: "def trap(height):\n    # your code here\n    pass\n",
    solution: "def trap(height):\n    if not height:\n        return 0\n    left, right = 0, len(height) - 1\n    left_max, right_max = height[left], height[right]\n    water = 0\n    while left < right:\n        if left_max <= right_max:\n            left += 1\n            left_max = max(left_max, height[left])\n            water += left_max - height[left]\n        else:\n            right -= 1\n            right_max = max(right_max, height[right])\n            water += right_max - height[right]\n    return water\n",
    complexity: "O(n) time, O(1) space.",
    tests: [{ call: "trap([0,1,0,2,1,0,1,3,2,1,2,1])", expected: "6" }]
  },
  {
    id: "fx-26", title: "Merge Sorted Array", category: "Arrays (Staple)",
    prompt: "Given two sorted arrays nums1 (with extra trailing space) and nums2, merge nums2 into nums1 in place as one sorted array.",
    example: "Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]",
    approach: "Fill from the back: comparing the largest remaining elements of each array and placing the bigger one at the current end avoids overwriting still-unread values in nums1.",
    starter: "def merge_sorted_array(nums1, m, nums2, n):\n    # your code here\n    pass\n",
    solution: "def merge_sorted_array(nums1, m, nums2, n):\n    i, j, k = m - 1, n - 1, m + n - 1\n    while j >= 0:\n        if i >= 0 and nums1[i] > nums2[j]:\n            nums1[k] = nums1[i]\n            i -= 1\n        else:\n            nums1[k] = nums2[j]\n            j -= 1\n        k -= 1\n    return nums1\n",
    complexity: "O(m + n) time, O(1) extra space.",
    tests: [{ call: "merge_sorted_array([1,2,3,0,0,0], 3, [2,5,6], 3)", expected: "[1, 2, 2, 3, 5, 6]" }]
  },
];

-- this selects posts 
SELECT *
  FROM development.posts 
INNER JOIN development.connections
ON (
(posts.username = connections.user1 AND connections.user2 = 'sonjukta04') OR (posts.username = connections.user2 AND connections.user1 = 'sonjukta04') AND connections.blocked = false)


--
SELECT posts.id, username, author, datetimeISO, connections.friends, connections.blocked, tags
  FROM development.posts
FULL OUTER JOIN development.connections
ON (posts.username = connections.user1 OR posts.username = connections.user2)


--
SELECT posts.id, title, description, username, author, datetimeISO, connections.blocked, connections.friends, tags
  FROM development.posts
FULL OUTER JOIN development.connections
ON (posts.username = connections.user1 OR posts.username = connections.user2) WHERE connections.blocked = "false"
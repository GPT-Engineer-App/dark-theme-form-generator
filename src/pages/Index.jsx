import { Box, Button, FormControl, FormLabel, Heading, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";

const API_KEY = "sk-Aq4JuoJ0qEEXYdGzrEwbdHvmYGrIsBjcXZgI0e9D8LiqNFsHEc7c1a";
const promptId = "dfe57768-c79c-4400-8a79-12fe648cf483";

const Index = () => {
  const [exame, setExame] = useState("");
  const [achados, setAchados] = useState("");
  const [laudo2versao, setLaudo2versao] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLaudo2versao("");

    const response = await fetch(`https://app.wordware.ai/api/prompt/${promptId}/run`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          exame: exame,
          achados: achados,
        },
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      buffer.push(chunk);

      const lines = buffer.join("").split("\n");
      buffer = [lines.pop()];

      for (const line of lines) {
        if (line.trim() === "") continue;

        const content = JSON.parse(line);
        const value = content.value;

        if (value.type === "outputs") {
          const laudo = value.outputs.Laudo2versao;
          setLaudo2versao(laudo);
        }
      }
    }

    setLoading(false);
  };

  return (
    <Box bg="black" minH="100vh" color="white" py={8}>
      <Box bg="url('https://i.ibb.co/1YVXjS8/natan-paraisk-The-logo-consists-of-abstract-shaped-forms-spelli-5c438335-6115-47fb-98ce-c9d0b5907cca.webp')" bgSize="cover" bgPosition="center" h="150px" w="100%" />
      <Box maxW="container.sm" mx="auto" mt={8} p={4} bg="#232323" borderRadius="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Exame:</FormLabel>
              <Input value={exame} onChange={(e) => setExame(e.target.value)} required />
            </FormControl>
            <FormControl>
              <FormLabel>Achados:</FormLabel>
              <Textarea value={achados} onChange={(e) => setAchados(e.target.value)} rows={5} required />
            </FormControl>
            <Button type="submit" colorScheme="blue" isLoading={loading}>
              Generate Report
            </Button>
          </VStack>
        </form>
        {loading && (
          <Text mt={8} textAlign="center">
            Loading...
          </Text>
        )}
        {laudo2versao && (
          <Box mt={8}>
            <Heading as="h3" size="lg" color="green.500">
              Laudo 2ª versão:
            </Heading>
            <Text mt={4}>{laudo2versao}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Index;

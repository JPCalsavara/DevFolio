"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { supabase } from "@/lib/supabase/client";

type ManagedEntity = "projects" | "technologies" | "experiences";
type GenericRow = { id?: string; [key: string]: unknown };

const TABLES: ManagedEntity[] = ["projects", "technologies", "experiences"];

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTable, setSelectedTable] = useState<ManagedEntity>("projects");
  const [rows, setRows] = useState<GenericRow[]>([]);
  const [createJson, setCreateJson] = useState('{\n  "title": "Novo item"\n}');
  const [editJson, setEditJson] = useState(
    '{\n  "title": "Item atualizado"\n}',
  );
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const availableIds = useMemo(
    () =>
      rows
        .map((row) => String(row.id))
        .filter((id) => id && id !== "undefined"),
    [rows],
  );

  async function loadRows(entity: ManagedEntity) {
    const { data, error: queryError } = await supabase
      .from(entity)
      .select("*")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
      return;
    }

    setRows(data ?? []);
    if (data?.length && !selectedId) {
      setSelectedId(String(data[0].id));
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    loadRows(selectedTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, selectedTable]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("Autenticando...");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setStatus("");
      return;
    }

    setStatus("Login realizado com sucesso.");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setRows([]);
    setStatus("Sessao encerrada.");
  }

  async function handleCreate() {
    setError("");
    const payload = JSON.parse(createJson) as GenericRow;
    const { error: createError } = await supabase
      .from(selectedTable)
      .insert(payload);

    if (createError) {
      setError(createError.message);
      return;
    }

    setStatus("Registro criado com sucesso.");
    await loadRows(selectedTable);
  }

  async function handleUpdate() {
    if (!selectedId) {
      setError("Selecione um ID para editar.");
      return;
    }

    setError("");
    const payload = JSON.parse(editJson) as GenericRow;
    const { error: updateError } = await supabase
      .from(selectedTable)
      .update(payload)
      .eq("id", selectedId);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setStatus("Registro atualizado com sucesso.");
    await loadRows(selectedTable);
  }

  async function handleDelete() {
    if (!selectedId) {
      setError("Selecione um ID para remover.");
      return;
    }

    setError("");
    const { error: deleteError } = await supabase
      .from(selectedTable)
      .delete()
      .eq("id", selectedId);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setStatus("Registro removido com sucesso.");
    await loadRows(selectedTable);
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Login Admin
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              Acesso para gerenciar projetos, tecnologias e experiências via
              Supabase.
            </Typography>

            {error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}
            {status ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                {status}
              </Alert>
            ) : null}

            <Stack component="form" spacing={2} onSubmit={handleLogin}>
              <TextField
                label="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <TextField
                label="Senha"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Entrar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3, justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h4">Painel Admin</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            CRUD básico conectado ao Supabase para atualizar conteúdo do
            portfólio.
          </Typography>
        </Box>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Sair
        </Button>
      </Stack>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}
      {status ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          {status}
        </Alert>
      ) : null}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Tabela</Typography>
            <Select
              value={selectedTable}
              onChange={(event) =>
                setSelectedTable(event.target.value as ManagedEntity)
              }
            >
              {TABLES.map((table) => (
                <MenuItem key={table} value={table}>
                  {table}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Criar registro
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={8}
              value={createJson}
              onChange={(event) => setCreateJson(event.target.value)}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleCreate}>
              Criar
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Editar ou remover
            </Typography>
            <Select
              fullWidth
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              displayEmpty
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Selecione um ID</MenuItem>
              {availableIds.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              multiline
              minRows={8}
              value={editJson}
              onChange={(event) => setEditJson(event.target.value)}
            />
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUpdate}
              >
                Atualizar
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Excluir
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Registros atuais
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={12}
            value={JSON.stringify(rows, null, 2)}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
